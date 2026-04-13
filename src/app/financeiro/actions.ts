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

  const { data: conta } = await supabase
    .from('contas')
    .select('*')
    .eq('id', id)
    .single()

  if (!conta) throw new Error('Conta não encontrada')

  const today = new Date().toISOString().split('T')[0]
  const tipoLancamento = conta.tipo === 'pagar' ? 'despesa' : 'receita'
  const isCasal = !!conta.couple_id

  // Cria o lançamento correspondente
  const { data: lancamento, error: lancErr } = await supabase
    .from('lancamentos')
    .insert({
      user_id: isCasal ? null : user.id,
      couple_id: conta.couple_id ?? null,
      descricao: conta.descricao,
      valor: conta.valor,
      tipo: tipoLancamento,
      categoria: conta.categoria,
      data: today,
      pago_por: conta.pago_por ?? (isCasal ? user.email : null),
      dividir: isCasal,
      divisao_percentual: 50,
      observacao: conta.observacao,
    })
    .select('id')
    .single()

  if (lancErr) throw new Error(lancErr.message)

  // Marca como pago e guarda referência ao lançamento criado
  const { error } = await supabase
    .from('contas')
    .update({
      pago: true,
      pago_em: new Date().toISOString(),
      lancamento_id: lancamento.id,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  // Auto-gera próxima ocorrência para contas recorrentes
  if (conta.recorrente && conta.dia_vencimento) {
    const [year, month] = conta.vencimento.split('-').map(Number)
    const nextMonth = month === 12 ? 1 : month + 1
    const nextYear = month === 12 ? year + 1 : year
    const lastDay = new Date(nextYear, nextMonth, 0).getDate()
    const day = Math.min(conta.dia_vencimento, lastDay)
    const nextVencimento = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`

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
  revalidatePath('/financeiro/lancamentos')
  revalidatePath('/financeiro/casal/lancamentos')
}

export async function despagarConta(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  // Busca o lancamento_id antes de atualizar
  const { data: conta } = await supabase
    .from('contas')
    .select('lancamento_id')
    .eq('id', id)
    .single()

  // Remove o lançamento gerado automaticamente, se existir
  if (conta?.lancamento_id) {
    await supabase.from('lancamentos').delete().eq('id', conta.lancamento_id)
  }

  const { error } = await supabase
    .from('contas')
    .update({ pago: false, pago_em: null, lancamento_id: null })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro/contas')
  revalidatePath('/financeiro')
  revalidatePath('/financeiro/casal')
  revalidatePath('/financeiro/lancamentos')
  revalidatePath('/financeiro/casal/lancamentos')
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

export async function acertarConta(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const coupleId = formData.get('coupleId') as string
  const pagadorEmail = formData.get('pagadorEmail') as string
  const valor = parseFloat(formData.get('valor') as string)
  const descricao = (formData.get('descricao') as string).trim() || 'Acerto de conta'
  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('lancamentos').insert({
    user_id: null,
    couple_id: coupleId,
    descricao,
    valor,
    tipo: 'acerto',
    categoria: 'Acerto',
    data: today,
    pago_por: pagadorEmail,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro/casal')
}

export async function desvincularCasal(coupleId: string) {
  const supabase = await createClient()
  await supabase.from('couples').delete().eq('id', coupleId)
  revalidatePath('/financeiro/configuracoes')
  redirect('/financeiro')
}
