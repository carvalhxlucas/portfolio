import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NovaContaForm from './form'
import type { Couple, Profile } from '@/types/financeiro'

export default async function NovaContaPage({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string }>
}) {
  const { modo } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { data: coupleData } = await supabase
    .from('couples')
    .select('id, user1_id, user2_id')
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .single()
  const couple = coupleData as (Couple & { user1_id: string; user2_id: string }) | null

  let partnerEmail: string | null = null
  if (couple) {
    const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id
    const { data: p } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', partnerId)
      .single()
    partnerEmail = (p as Pick<Profile, 'email'> | null)?.email ?? null
  }

  return (
    <NovaContaForm
      coupleId={couple?.id ?? null}
      myEmail={user.email!}
      partnerEmail={partnerEmail}
      defaultMode={modo === 'casal' ? 'casal' : 'individual'}
    />
  )
}
