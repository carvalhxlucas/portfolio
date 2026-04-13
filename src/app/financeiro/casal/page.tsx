import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Nav from '../_components/Nav'
import { deletarLancamentoCasal } from '../actions'
import DeleteButton from '../lancamentos/_components/DeleteButton'
import type { Lancamento, Couple, Profile } from '@/types/financeiro'

export default async function CasalPage() {
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

  if (!couple) {
    return (
      <>
        <Nav active="casal" />
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-3xl mb-4">💑</p>
            <h2 className="text-lg font-semibold mb-2">Nenhum casal configurado</h2>
            <p className="text-slate-400 text-sm mb-6">
              Vincule sua conta com a conta da sua parceira para usar o modo Casal.
            </p>
            <Link
              href="/financeiro/configuracoes"
              className="bg-violet-600 hover:bg-violet-500 text-sm px-6 py-2.5 rounded-lg transition-colors inline-block"
            >
              Configurar casal
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Busca profile do parceiro
  const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id
  const { data: partnerProfile } = await supabase
    .from('profiles')
    .select('id, email, nome')
    .eq('id', partnerId)
    .single()
  const partner = partnerProfile as Profile | null

  // Lançamentos do mês atual
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month).padStart(2, '0')}-31`

  const { data } = await supabase
    .from('lancamentos')
    .select('*')
    .eq('couple_id', couple.id)
    .gte('data', startDate)
    .lte('data', endDate)
    .order('data', { ascending: false })

  const lancamentos = (data ?? []) as Lancamento[]
  const receitas = lancamentos
    .filter((l) => l.tipo === 'receita')
    .reduce((acc, l) => acc + Number(l.valor), 0)
  const despesas = lancamentos
    .filter((l) => l.tipo === 'despesa')
    .reduce((acc, l) => acc + Number(l.valor), 0)
  const saldo = receitas - despesas

  // Cálculo: quem deve quem
  const meEmail = user.email!
  const partnerEmail = partner?.email ?? ''
  const despesasCasal = lancamentos.filter((l) => l.tipo === 'despesa')
  const pagueiEu = despesasCasal
    .filter((l) => l.pago_por === meEmail)
    .reduce((acc, l) => acc + Number(l.valor), 0)
  const pagueiParceiro = despesasCasal
    .filter((l) => l.pago_por === partnerEmail)
    .reduce((acc, l) => acc + Number(l.valor), 0)
  const totalDespesas = pagueiEu + pagueiParceiro
  const metade = totalDespesas / 2
  const diferenca = pagueiEu - metade

  const mesNome = now.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
  const ultimos5 = lancamentos.slice(0, 5)

  const nomeEu = meEmail.split('@')[0]
  const nomeParceiro = partnerEmail.split('@')[0]

  return (
    <>
      <Nav active="casal" />
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Casal</h1>
            <p className="text-slate-400 text-sm capitalize">{mesNome}</p>
          </div>
          <Link
            href="/financeiro/casal/lancamentos/novo"
            className="bg-violet-600 hover:bg-violet-500 text-sm px-4 py-2 rounded-lg transition-colors"
          >
            + Novo
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-2xl p-5">
            <p className="text-slate-500 text-xs mb-1.5">Saldo conjunto</p>
            <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {fmt(saldo)}
            </p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-slate-500 text-xs mb-1.5">Receitas</p>
            <p className="text-2xl font-bold text-emerald-400">{fmt(receitas)}</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-slate-500 text-xs mb-1.5">Despesas</p>
            <p className="text-2xl font-bold text-red-400">{fmt(despesas)}</p>
          </div>
        </div>

        {/* Quem deve quem */}
        {totalDespesas > 0 && (
          <div className="glass rounded-2xl p-6 mb-6">
            <h2 className="text-sm font-medium text-slate-300 mb-4">Divisão de despesas</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1 capitalize">{nomeEu} pagou</p>
                <p className="text-lg font-bold">{fmt(pagueiEu)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1 capitalize">{nomeParceiro} pagou</p>
                <p className="text-lg font-bold">{fmt(pagueiParceiro)}</p>
              </div>
            </div>
            <div className={`rounded-xl p-4 ${Math.abs(diferenca) < 0.01 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
              {Math.abs(diferenca) < 0.01 ? (
                <p className="text-sm text-emerald-400 text-center font-medium">
                  Estão quites! Cada um pagou {fmt(metade)}
                </p>
              ) : diferenca > 0 ? (
                <p className="text-sm text-amber-300 text-center">
                  <span className="font-semibold capitalize">{nomeParceiro}</span> deve{' '}
                  <span className="font-bold text-amber-400">{fmt(diferenca)}</span> para{' '}
                  <span className="font-semibold capitalize">{nomeEu}</span>
                </p>
              ) : (
                <p className="text-sm text-amber-300 text-center">
                  <span className="font-semibold capitalize">{nomeEu}</span> deve{' '}
                  <span className="font-bold text-amber-400">{fmt(Math.abs(diferenca))}</span> para{' '}
                  <span className="font-semibold capitalize">{nomeParceiro}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Últimos lançamentos */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-300">Últimos lançamentos</h2>
            <Link
              href="/financeiro/casal/lancamentos"
              className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {ultimos5.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">
              Nenhum lançamento este mês.{' '}
              <Link
                href="/financeiro/casal/lancamentos/novo"
                className="text-violet-400 hover:underline"
              >
                Criar primeiro
              </Link>
            </p>
          ) : (
            <ul>
              {ultimos5.map((l, i) => (
                <li
                  key={l.id}
                  className={`flex items-center justify-between py-3 ${i < ultimos5.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{l.descricao}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {l.categoria} · {fmtDate(l.data)}
                      {l.pago_por ? ` · ${l.pago_por.split('@')[0]}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <span
                      className={`text-sm font-medium ${l.tipo === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}
                    >
                      {l.tipo === 'receita' ? '+' : '-'}
                      {fmt(Number(l.valor))}
                    </span>
                    <Link
                      href={`/financeiro/casal/lancamentos/${l.id}/editar`}
                      className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteButton id={l.id} action={deletarLancamentoCasal} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}
