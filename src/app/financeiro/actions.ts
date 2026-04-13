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

  const { error } = await supabase
    .from('contas')
    .update({ pago: true, pago_em: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro/contas')
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
