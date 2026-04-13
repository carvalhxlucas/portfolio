import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EditarContaForm from './form'
import type { Conta, Couple, Profile } from '@/types/financeiro'

export default async function EditarContaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { data } = await supabase.from('contas').select('*').eq('id', id).single()
  if (!data) notFound()
  const conta = data as Conta

  // Info do casal se for conta do casal
  let partnerEmail: string | null = null
  if (conta.couple_id) {
    const { data: coupleData } = await supabase
      .from('couples')
      .select('user1_id, user2_id')
      .eq('id', conta.couple_id)
      .single()
    if (coupleData) {
      const c = coupleData as Pick<Couple, 'user1_id' | 'user2_id'>
      const partnerId = c.user1_id === user.id ? c.user2_id : c.user1_id
      const { data: p } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', partnerId)
        .single()
      partnerEmail = (p as Pick<Profile, 'email'> | null)?.email ?? null
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <header className="mb-8">
        <a
          href="/financeiro/contas"
          className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
        >
          ← Contas
        </a>
        <h1 className="text-2xl font-bold mt-1">Editar Conta</h1>
      </header>
      <EditarContaForm
        conta={conta}
        myEmail={user.email!}
        partnerEmail={partnerEmail}
      />
    </div>
  )
}
