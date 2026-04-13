'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/financeiro/login')
}

// ─── Lançamentos individuais ──────────────────────────────────────────────────

export async function deletarLancamento(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { error } = await supabase
    .from('lancamentos')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
    .is('couple_id', null)

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro')
  revalidatePath('/financeiro/lancamentos')
}

// ─── Lançamentos do casal ─────────────────────────────────────────────────────

export async function deletarLancamentoCasal(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { error } = await supabase
    .from('lancamentos')
    .delete()
    .eq('id', id)
    .not('couple_id', 'is', null)

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro/casal')
  revalidatePath('/financeiro/casal/lancamentos')
}

// ─── Investimentos ────────────────────────────────────────────────────────────

export async function deletarInvestimento(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { error } = await supabase.from('investimentos').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro/investimentos')
}

// ─── Casal / configurações ────────────────────────────────────────────────────

export async function vincularCasal(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const email = (formData.get('email') as string).trim().toLowerCase()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  // Garante profile próprio
  await supabase
    .from('profiles')
    .upsert({ id: user.id, email: user.email! }, { onConflict: 'id' })

  if (email === user.email?.toLowerCase()) {
    return { error: 'Você não pode se vincular a si mesmo.' }
  }

  const { data: partner } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

  if (!partner) {
    return {
      error: 'Usuário não encontrado. O e-mail precisa estar cadastrado no app.',
    }
  }

  const [u1, u2] = [user.id, partner.id].sort()
  const { error } = await supabase
    .from('couples')
    .insert({ user1_id: u1, user2_id: u2 })

  if (error) {
    if (error.code === '23505') return { error: 'Vocês já estão vinculados.' }
    return { error: error.message }
  }

  revalidatePath('/financeiro/configuracoes')
  return null
}

// ─── Contas a pagar / receber ─────────────────────────────────────────────────

export async function pagarConta(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  // Fetch the conta first so we can check if it's recorrente
  const { data: conta } = await supabase
    .from('contas')
    .select('*')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('contas')
    .update({ pago: true, pago_em: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)

  // Auto-generate next month's occurrence for recurring bills
  if (conta?.recorrente && conta.dia_vencimento) {
    const [year, month] = conta.vencimento.split('-').map(Number)
    const nextMonth = month === 12 ? 1 : month + 1
    const nextYear = month === 12 ? year + 1 : year
    // Clamp day to last day of next month
    const lastDay = new Date(nextYear, nextMonth, 0).getDate()
    const day = Math.min(conta.dia_vencimento, lastDay)
    const nextVencimento = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    // Only create if not already exists (same descricao + vencimento)
    const { data: existing } = await supabase
      .from('contas')
      .select('id')
      .eq('descricao', conta.descricao)
      .eq('vencimento', nextVencimento)
      .eq('pago', false)
      .maybeSingle()

    if (!existing) {
      await supabase.from('contas').insert({
        user_id: conta.user_id,
        couple_id: conta.couple_id,
        descricao: conta.descricao,
        valor: conta.valor,
        tipo: conta.tipo,
        categoria: conta.categoria,
        vencimento: nextVencimento,
        pago: false,
        recorrente: true,
        dia_vencimento: conta.dia_vencimento,
        pago_por: null,
      })
    }
  }

  revalidatePath('/financeiro/contas')
  revalidatePath('/financeiro')
  revalidatePath('/financeiro/casal')
}

export async function despagarConta(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { error } = await supabase
    .from('contas')
    .update({ pago: false, pago_em: null })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro/contas')
}

export async function deletarConta(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { error } = await supabase.from('contas').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro/contas')
}

export async function desvincularCasal(coupleId: string) {
  const supabase = await createClient()
  await supabase.from('couples').delete().eq('id', coupleId)
  revalidatePath('/financeiro/configuracoes')
  redirect('/financeiro')
}
