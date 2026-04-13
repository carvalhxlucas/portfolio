import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NovoInvestimentoForm from './form'
import type { Couple } from '@/types/financeiro'

export default async function NovoInvestimentoPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/financeiro/login')

  const { data: coupleData } = await supabase
    .from('couples')
    .select('id')
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .single()
  const couple = coupleData as Pick<Couple, 'id'> | null

  return <NovoInvestimentoForm coupleId={couple?.id ?? null} />
}
