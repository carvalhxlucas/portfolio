import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from './actions'
import type { Lancamento } from '@/types/financeiro'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month).padStart(2, '0')}-31`

  const { data } = await supabase
    .from('lancamentos')
    .select('*')
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Financeiro</h1>
          <p className="text-slate-400 text-sm capitalize">{mesNome}</p>
        </div>
        <nav className="flex items-center gap-5">
          <Link
            href="/financeiro/lancamentos"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Lançamentos
          </Link>
          <Link
            href="/financeiro/resumo"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Resumo
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              Sair
            </button>
          </form>
        </nav>
      </header>

      {/* KPI Cards */}
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

      {/* Recent transactions */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-slate-300">Últimos lançamentos</h2>
          <Link
            href="/financeiro/lancamentos/novo"
            className="text-xs bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            + Novo
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
                <div>
                  <p className="text-sm">{l.descricao}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {l.categoria} · {fmtDate(l.data)}
                    {l.pago_por ? ` · ${l.pago_por}` : ''}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ml-4 ${l.tipo === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {l.tipo === 'receita' ? '+' : '-'}
                  {fmt(Number(l.valor))}
                </span>
              </li>
            ))}
          </ul>
        )}

        {lancamentos.length > 5 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <Link
              href="/financeiro/lancamentos"
              className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
            >
              Ver todos ({lancamentos.length} lançamentos) →
            </Link>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 mt-6 text-center">{user?.email}</p>
    </div>
  )
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}
