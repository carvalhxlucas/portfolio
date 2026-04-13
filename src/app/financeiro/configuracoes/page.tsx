import { createClient } from '@/lib/supabase/server'
import Nav from '../_components/Nav'
import VincularForm from './VincularForm'
import { desvincularCasal } from '../actions'
import type { Couple, Profile } from '@/types/financeiro'

export default async function ConfiguracoesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  // Garante profile próprio
  await supabase
    .from('profiles')
    .upsert({ id: user.id, email: user.email! }, { onConflict: 'id' })

  // Busca couple
  const { data: coupleData } = await supabase
    .from('couples')
    .select('*')
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .single()
  const couple = coupleData as Couple | null

  let partner: Profile | null = null
  if (couple) {
    const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id
    const { data } = await supabase
      .from('profiles')
      .select('id, email, nome')
      .eq('id', partnerId)
      .single()
    partner = data as Profile | null
  }

  return (
    <>
      <Nav active="configuracoes" />
      <div className="max-w-xl mx-auto px-4 pb-8">
        <h1 className="text-2xl font-bold mb-8">Configurações</h1>

        {/* Conta atual */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-medium text-slate-300 mb-3">Sua conta</h2>
          <p className="text-sm text-slate-400">{user.email}</p>
        </div>

        {/* Casal */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-medium text-slate-300 mb-4">Modo Casal</h2>

          {couple && partner ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center text-xs font-bold text-violet-300">
                  {partner.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{partner.nome ?? partner.email.split('@')[0]}</p>
                  <p className="text-xs text-slate-500">{partner.email}</p>
                </div>
                <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                  vinculado
                </span>
              </div>
              <form
                action={async () => {
                  'use server'
                  await desvincularCasal(couple.id)
                }}
              >
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-sm text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors"
                >
                  Desvincular casal
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500 mb-4">
                Informe o e-mail da sua parceira para vincular as contas. Ela precisa ter se
                logado pelo menos uma vez no app.
              </p>
              <VincularForm />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
