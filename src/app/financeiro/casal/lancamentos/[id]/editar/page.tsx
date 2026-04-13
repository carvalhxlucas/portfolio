import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EditarLancamentoCasalForm from './form'
import type { Lancamento, Couple, Profile } from '@/types/financeiro'

export default async function EditarLancamentoCasalPage({
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

  const { data: lancamento } = await supabase
    .from('lancamentos')
    .select('*')
    .eq('id', id)
    .not('couple_id', 'is', null)
    .single()

  if (!lancamento) notFound()

  const { data: coupleData } = await supabase
    .from('couples')
    .select('*')
    .eq('id', (lancamento as Lancamento).couple_id!)
    .single()
  const couple = coupleData as Couple | null
  if (!couple) notFound()

  const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id
  const { data: partnerProfile } = await supabase
    .from('profiles')
    .select('id, email, nome')
    .eq('id', partnerId)
    .single()
  const partner = partnerProfile as Profile | null

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <header className="mb-8">
        <a
          href="/financeiro/casal/lancamentos"
          className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
        >
          ← Lançamentos do Casal
        </a>
        <h1 className="text-2xl font-bold mt-1">Editar Lançamento</h1>
      </header>
      <EditarLancamentoCasalForm
        lancamento={lancamento as Lancamento}
        myEmail={user.email!}
        partnerEmail={partner?.email ?? ''}
      />
    </div>
  )
}
