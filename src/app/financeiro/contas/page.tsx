import { createClient } from '@/lib/supabase/server'
import Nav from '../_components/Nav'
import ContasClient from './ContasClient'
import type { Conta, Couple, Profile } from '@/types/financeiro'

export default async function ContasPage({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string }>
}) {
  const { modo } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  // Couple
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

  // Contas individuais
  const { data: individuais } = await supabase
    .from('contas')
    .select('*')
    .is('couple_id', null)
    .order('vencimento', { ascending: true })

  // Contas do casal
  const { data: casal } = couple
    ? await supabase
        .from('contas')
        .select('*')
        .eq('couple_id', couple.id)
        .order('vencimento', { ascending: true })
    : { data: null }

  return (
    <>
      <Nav active="contas" />
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <ContasClient
          individuais={(individuais ?? []) as Conta[]}
          casal={(casal ?? []) as Conta[]}
          coupleId={couple?.id ?? null}
          myEmail={user.email!}
          partnerEmail={partnerEmail}
          defaultMode={modo === 'casal' && couple ? 'casal' : 'individual'}
        />
      </div>
    </>
  )
}
