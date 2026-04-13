import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NovoLancamentoCasalForm from './form'
import type { Couple, Profile } from '@/types/financeiro'

export default async function NovoLancamentoCasalPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { data: coupleData } = await supabase
    .from('couples')
    .select('*')
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .single()
  const couple = coupleData as Couple | null

  if (!couple) redirect('/financeiro/configuracoes')

  const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id
  const { data: partnerProfile } = await supabase
    .from('profiles')
    .select('id, email, nome')
    .eq('id', partnerId)
    .single()
  const partner = partnerProfile as Profile | null

  return (
    <NovoLancamentoCasalForm
      coupleId={couple.id}
      myEmail={user.email!}
      partnerEmail={partner?.email ?? ''}
    />
  )
}
