import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteButton from '../../lancamentos/_components/DeleteButton'
import { deletarLancamentoCasal } from '../../actions'
import type { Lancamento, Couple } from '@/types/financeiro'

export default async function CasalLancamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string; ano?: string }>
}) {
  const { mes, ano } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: coupleData } = await supabase
    .from('couples')
    .select('*')
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .single()
  const couple = coupleData as Couple | null

  if (!couple) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-slate-400 text-sm mb-4">Nenhum casal configurado.</p>
        <Link href="/financeiro/configuracoes" className="text-violet-400 hover:underline text-sm">
          Configurar casal →
        </Link>
      </div>
    )
  }

  const now = new Date()
  const year = ano ? parseInt(ano) : now.getFullYear()
  const month = mes ? parseInt(mes) : now.getMonth() + 1
  const lastDay = new Date(year, month, 0).getDate()
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

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

  const monthDate = new Date(year, month - 1)
  const mesNome = monthDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  const prevMes = month === 1 ? `?mes=12&ano=${year - 1}` : `?mes=${month - 1}&ano=${year}`
  const nextMes = month === 12 ? `?mes=1&ano=${year + 1}` : `?mes=${month + 1}&ano=${year}`

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/financeiro/casal"
            className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
          >
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-bold mt-1">Lançamentos do Casal</h1>
        </div>
        <Link
          href="/financeiro/casal/lancamentos/novo"
          className="bg-violet-600 hover:bg-violet-500 text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Novo
        </Link>
      </header>

      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/financeiro/casal/lancamentos${prevMes}`}
          className="glass text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          ←
        </Link>
        <span className="text-sm font-medium capitalize">{mesNome}</span>
        <Link
          href={`/financeiro/casal/lancamentos${nextMes}`}
          className="glass text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Receitas</p>
          <p className="text-base font-bold text-emerald-400">{fmt(receitas)}</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Despesas</p>
          <p className="text-base font-bold text-red-400">{fmt(despesas)}</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Saldo</p>
          <p
            className={`text-base font-bold ${receitas - despesas >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
          >
            {fmt(receitas - despesas)}
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        {lancamentos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">Nenhum lançamento neste mês.</p>
            <Link
              href="/financeiro/casal/lancamentos/novo"
              className="text-violet-400 text-sm hover:underline mt-2 inline-block"
            >
              Criar primeiro lançamento
            </Link>
          </div>
        ) : (
          <ul>
            {lancamentos.map((l, i) => (
              <li
                key={l.id}
                className={`flex items-center justify-between px-5 py-4 ${
                  i < lancamentos.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{l.descricao}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {l.categoria} · {fmtDate(l.data)}
                    {l.pago_por ? ` · ${l.pago_por.split('@')[0]}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-4 shrink-0">
                  <span
                    className={`text-sm font-medium ${l.tipo === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {l.tipo === 'receita' ? '+' : '-'}
                    {fmt(Number(l.valor))}
                  </span>
                  <div className="flex gap-3">
                    <Link
                      href={`/financeiro/casal/lancamentos/${l.id}/editar`}
                      className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteButton id={l.id} action={deletarLancamentoCasal} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
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
