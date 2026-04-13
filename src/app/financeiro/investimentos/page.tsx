import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Nav from '../_components/Nav'
import DeleteInvestimentoButton from './_components/DeleteInvestimentoButton'
import ObservacaoIcon from '../_components/ObservacaoIcon'
import { deletarInvestimento } from '../actions'
import type { Investimento, Couple } from '@/types/financeiro'

export default async function InvestimentosPage() {
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

  const { data } = await supabase
    .from('investimentos')
    .select('*')
    .order('data', { ascending: false })

  const investimentos = (data ?? []) as Investimento[]

  // Separar individual e casal
  const individuais = investimentos.filter((i) => !i.couple_id)
  const casal = investimentos.filter((i) => i.couple_id)

  // Totais
  function calcPatrimonio(list: Investimento[]) {
    return list.reduce((acc, i) => {
      if (i.tipo === 'aporte' || i.tipo === 'rendimento') return acc + Number(i.valor)
      if (i.tipo === 'resgate') return acc - Number(i.valor)
      return acc
    }, 0)
  }

  const patrimonioIndividual = calcPatrimonio(individuais)
  const patrimonioCasal = calcPatrimonio(casal)

  // Agrupamento por categoria (todos)
  const porCategoria = investimentos.reduce<Record<string, number>>((acc, i) => {
    const delta =
      i.tipo === 'aporte' || i.tipo === 'rendimento' ? Number(i.valor) : -Number(i.valor)
    acc[i.categoria] = (acc[i.categoria] ?? 0) + delta
    return acc
  }, {})

  const categoriasSorted = Object.entries(porCategoria)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)

  const totalPatrimonio = patrimonioIndividual + patrimonioCasal

  return (
    <>
      <Nav active="individual" />
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/financeiro"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors mb-1 inline-block"
            >
              ← Individual
            </Link>
            <h1 className="text-2xl font-bold gradient-text">Investimentos</h1>
            <p className="text-slate-400 text-sm">Carteira consolidada</p>
          </div>
          <Link
            href="/financeiro/investimentos/novo"
            className="bg-violet-600 hover:bg-violet-500 text-sm px-4 py-2 rounded-lg transition-colors"
          >
            + Novo
          </Link>
        </div>

        {/* Patrimônio total */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-2xl p-5">
            <p className="text-slate-500 text-xs mb-1.5">Patrimônio total</p>
            <p className="text-2xl font-bold text-violet-400">{fmt(totalPatrimonio)}</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-slate-500 text-xs mb-1.5">Individual</p>
            <p className="text-2xl font-bold">{fmt(patrimonioIndividual)}</p>
          </div>
          {couple && (
            <div className="glass rounded-2xl p-5">
              <p className="text-slate-500 text-xs mb-1.5">Casal</p>
              <p className="text-2xl font-bold">{fmt(patrimonioCasal)}</p>
            </div>
          )}
        </div>

        {/* Por categoria */}
        {categoriasSorted.length > 0 && (
          <div className="glass rounded-2xl p-6 mb-6">
            <h2 className="text-sm font-medium text-slate-300 mb-4">Por categoria</h2>
            <div className="space-y-3">
              {categoriasSorted.map(([cat, valor]) => {
                const pct = totalPatrimonio > 0 ? (valor / totalPatrimonio) * 100 : 0
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{cat}</span>
                      <span className="text-slate-400">
                        {fmt(valor)} · {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Lista de transações */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-medium text-slate-300">Histórico</h2>
          </div>
          {investimentos.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500">Nenhum investimento registrado.</p>
              <Link
                href="/financeiro/investimentos/novo"
                className="text-violet-400 text-sm hover:underline mt-2 inline-block"
              >
                Registrar primeiro
              </Link>
            </div>
          ) : (
            <ul>
              {investimentos.map((inv, i) => (
                <li
                  key={inv.id}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i < investimentos.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{inv.descricao}</p>
                      {inv.couple_id && (
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded">
                          casal
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {inv.categoria} · {fmtDate(inv.data)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 ml-4 shrink-0">
                    <span
                      className={`text-sm font-medium ${
                        inv.tipo === 'resgate'
                          ? 'text-red-400'
                          : inv.tipo === 'rendimento'
                          ? 'text-emerald-400'
                          : 'text-blue-400'
                      }`}
                    >
                      {inv.tipo === 'resgate' ? '-' : '+'}
                      {fmt(Number(inv.valor))}
                    </span>
                    <span className="text-xs text-slate-600 capitalize">{inv.tipo}</span>
                    <ObservacaoIcon observacao={inv.observacao} />
                    <DeleteInvestimentoButton id={inv.id} action={deletarInvestimento} />
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
