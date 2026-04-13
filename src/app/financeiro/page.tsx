import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Nav from './_components/Nav'
import { deletarLancamento } from './actions'
import DeleteButton from './lancamentos/_components/DeleteButton'
import type { Lancamento } from '@/types/financeiro'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const lastDay = new Date(year, month, 0).getDate()
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

  const { data } = await supabase
    .from('lancamentos')
    .select('*')
    .is('couple_id', null)
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
  const ultimos5 = lancamentos.slice(0, 5)

  const mesNome = now.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <>
      <Nav active="individual" />
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Individual</h1>
            <p className="text-slate-400 text-sm capitalize">{mesNome}</p>
          </div>
          <Link
            href="/financeiro/lancamentos/novo"
            className="bg-violet-600 hover:bg-violet-500 text-sm px-4 py-2 rounded-lg transition-colors"
          >
            + Novo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-5">
            <p className="text-slate-500 text-xs mb-1.5">Saldo do mês</p>
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

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-300">Últimos lançamentos</h2>
            <Link
              href="/financeiro/lancamentos"
              className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {ultimos5.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">
              Nenhum lançamento este mês.{' '}
              <Link href="/financeiro/lancamentos/novo" className="text-violet-400 hover:underline">
                Criar primeiro
              </Link>
            </p>
          ) : (
            <ul className="space-y-0">
              {ultimos5.map((l, i) => (
                <li
                  key={l.id}
                  className={`flex items-center justify-between py-3 ${i < ultimos5.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{l.descricao}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {l.categoria} · {fmtDate(l.data)}
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
                      href={`/financeiro/lancamentos/${l.id}/editar`}
                      className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteButton id={l.id} action={deletarLancamento} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-xs text-slate-600 mt-6 text-center">{user?.email}</p>
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
