'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Lancamento } from '@/types/financeiro'

const PALETTE = [
  '#a78bfa',
  '#60a5fa',
  '#34d399',
  '#f472b6',
  '#fb923c',
  '#facc15',
  '#38bdf8',
  '#4ade80',
  '#f87171',
  '#c084fc',
  '#818cf8',
  '#2dd4bf',
  '#e879f9',
]

type Slice = { categoria: string; total: number; cor: string }

export default function ResumoPage() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
  const [loading, setLoading] = useState(true)

  const now = new Date()
  const [mes, setMes] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  )

  useEffect(() => {
    setLoading(true)
    const supabase = createClient()
    const [year, month] = mes.split('-')

    supabase
      .from('lancamentos')
      .select('*')
      .is('couple_id', null)
      .gte('data', `${year}-${month}-01`)
      .lte('data', `${year}-${month}-31`)
      .then(({ data }) => {
        setLancamentos((data ?? []) as Lancamento[])
        setLoading(false)
      })
  }, [mes])

  const slices: Slice[] = useMemo(() => {
    const totals = lancamentos
      .filter((l) => l.tipo === 'despesa')
      .reduce<Record<string, number>>((acc, l) => {
        acc[l.categoria] = (acc[l.categoria] ?? 0) + Number(l.valor)
        return acc
      }, {})

    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .map(([categoria, total], i) => ({
        categoria,
        total,
        cor: PALETTE[i % PALETTE.length],
      }))
  }, [lancamentos])

  const totalDespesas = slices.reduce((acc, s) => acc + s.total, 0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/financeiro"
            className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
          >
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-bold mt-1">Resumo</h1>
        </div>
        <input
          type="month"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </header>

      {loading ? (
        <div className="glass rounded-2xl p-12 text-center text-slate-500 text-sm">
          Carregando...
        </div>
      ) : slices.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-slate-500 text-sm">
          Nenhuma despesa neste mês.
        </div>
      ) : (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-medium text-slate-300 mb-6">Despesas por categoria</h2>

          <PieChart slices={slices} total={totalDespesas} />

          <ul className="mt-6 space-y-2">
            {slices.map((s) => (
              <li key={s.categoria} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.cor }}
                  />
                  <span className="text-slate-300">{s.categoria}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs">
                    {((s.total / totalDespesas) * 100).toFixed(1)}%
                  </span>
                  <span className="font-medium tabular-nums">
                    {fmt(s.total)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm">
            <span className="text-slate-400">Total despesas</span>
            <span className="font-bold text-red-400">{fmt(totalDespesas)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function PieChart({ slices, total }: { slices: Slice[]; total: number }) {
  const CX = 120
  const CY = 120
  const R = 90
  const INNER_R = 50 // donut hole

  let angle = -Math.PI / 2

  const paths = slices.map((s) => {
    const sweep = (s.total / total) * 2 * Math.PI
    const end = angle + sweep

    const x1o = CX + R * Math.cos(angle)
    const y1o = CY + R * Math.sin(angle)
    const x2o = CX + R * Math.cos(end)
    const y2o = CY + R * Math.sin(end)

    const x1i = CX + INNER_R * Math.cos(end)
    const y1i = CY + INNER_R * Math.sin(end)
    const x2i = CX + INNER_R * Math.cos(angle)
    const y2i = CY + INNER_R * Math.sin(angle)

    const large = sweep > Math.PI ? 1 : 0

    const d = [
      `M ${x1o} ${y1o}`,
      `A ${R} ${R} 0 ${large} 1 ${x2o} ${y2o}`,
      `L ${x1i} ${y1i}`,
      `A ${INNER_R} ${INNER_R} 0 ${large} 0 ${x2i} ${y2i}`,
      'Z',
    ].join(' ')

    angle = end
    return { d, cor: s.cor, categoria: s.categoria }
  })

  return (
    <svg viewBox="0 0 240 240" className="w-44 h-44 mx-auto">
      {paths.map((p) => (
        <path
          key={p.categoria}
          d={p.d}
          fill={p.cor}
          stroke="#06060f"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
