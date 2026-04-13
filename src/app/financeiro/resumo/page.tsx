import { createClient } from '@/lib/supabase/server'
import Nav from '../_components/Nav'
import ResumoClient from './ResumoClient'
import type { Couple } from '@/types/financeiro'

export default async function ResumoPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: coupleData } = await supabase
    .from('couples')
    .select('id')
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .single()
  const couple = coupleData as Pick<Couple, 'id'> | null

  // Busca emails do casal para exibir no gráfico "por pessoa"
  let partnerEmail: string | null = null
  if (couple) {
    const { data: fullCouple } = await supabase
      .from('couples')
      .select('user1_id, user2_id')
      .eq('id', couple.id)
      .single()

    if (fullCouple) {
      const partnerId =
        fullCouple.user1_id === user.id ? fullCouple.user2_id : fullCouple.user1_id
      const { data: p } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', partnerId)
        .single()
      partnerEmail = p?.email ?? null
    }
  }

  return (
    <>
      <Nav active="resumo" />
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <ResumoClient
          coupleId={couple?.id ?? null}
          myEmail={user.email!}
          partnerEmail={partnerEmail}
        />
      </div>
    </>
  )
}
