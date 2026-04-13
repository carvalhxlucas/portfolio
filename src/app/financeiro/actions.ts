'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/financeiro/login')
}

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
    .eq('user_id', user.id) // RLS double-check

  if (error) throw new Error(error.message)

  revalidatePath('/financeiro')
  revalidatePath('/financeiro/lancamentos')
}
