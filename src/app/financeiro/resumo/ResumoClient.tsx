'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Lancamento } from '@/types/financeiro'

// ─── Paleta ────────────────────────────────────────────────────────────────────

const PALETTE = [
  '#a78bfa', '#60a5fa', '#34d399', '#f472b6', '#fb923c',
  '#facc15', '#38bdf8', '#4ade80', '#f87171', '#c084fc',
  '#818cf8', '#2dd4bf', '#e879f9',
]

// ─── Tipos ─────────────────────────────────────────────────────────────────────

type Mode = 'individual' | 'casal'
type Slice = { categoria: string; total: number; cor: string }

type Props = {
  coupleId: string | null
  myEmail: string
  partnerEmail: string | null
}

// ─── Componente principal ──────────────────────────────────────────────────────

export default function ResumoClient({ coupleId, myEmail, partnerEmail }: Props) {
  const now = new Date()
  const [mes, setMes] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  )
  const [mode, setMode] = useState<Mode>('individual')
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const supabase = createClient()
    const [year, month] = mes.split('-')

    let query = supabase
      .from('lancamentos')
      .select('*')
      .gte('data', `${year}-${month}-01`)
      .lte('data', `${year}-${month}-31`)

    if (mode === 'individual') {
      query = query.is('couple_id', null)
    } else if (coupleId) {
      query = query.eq('couple_id', coupleId)
    }

    query.order('data', { ascending: true }).then(({ data }) => {
      setLancamentos((data ?? []) as Lancamento[])
      setLoading(false)
    })
  }, [mes, mode, coupleId])

  // ── Cálculos ────────────────────────────────────────────────────────────────

  const receitas = useMemo(
    () => lancamentos.filter((l) => l.tipo === 'receita').reduce((s, l) => s + Number(l.valor), 0),
    [lancamentos]
  )
  const despesas = useMemo(
    () => lancamentos.filter((l) => l.tipo === 'despesa').reduce((s, l) => s + Number(l.valor), 0),
    [lancamentos]
  )
  const saldo = receitas - despesas

  const slicesCat: Slice[] = useMemo(() => {
    const totals = lancamentos
      .filter((l) => l.tipo === 'despesa')
      .reduce<Record<string, number>>((acc, l) => {
        acc[l.categoria] = (acc[l.categoria] ?? 0) + Number(l.valor)
        return acc
      }, {})
    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .map(([categoria, total], i) => ({ categoria, total, cor: PALETTE[i % PALETTE.length] }))
  }, [lancamentos])

  // Receitas por categoria
  const slicesRec: Slice[] = useMemo(() => {
    const totals = lancamentos
      .filter((l) => l.tipo === 'receita')
      .reduce<Record<string, number>>((acc, l) => {
        acc[l.categoria] = (acc[l.categoria] ?? 0) + Number(l.valor)
        return acc
      }, {})
    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .map(([categoria, total], i) => ({ categoria, total, cor: PALETTE[i % PALETTE.length] }))
  }, [lancamentos])

  // Por pessoa (casal)
  const myName = myEmail.split('@')[0]
  const partnerName = partnerEmail?.split('@')[0] ?? 'Parceiro(a)'
  const pagouEu = lancamentos
    .filter((l) => l.tipo === 'despesa' && l.pago_por === myEmail)
    .reduce((s, l) => s + Number(l.valor), 0)
  const pagouParceiro = lancamentos
    .filter((l) => l.tipo === 'despesa' && l.pago_por === partnerEmail)
    .reduce((s, l) => s + Number(l.valor), 0)

  // Evolução diária (saldo acumulado)
  const evolucao = useMemo(() => {
    const byDay: Record<string, number> = {}
    lancamentos.forEach((l) => {
      const delta = l.tipo === 'receita' ? Number(l.valor) : -Number(l.valor)
      byDay[l.data] = (byDay[l.data] ?? 0) + delta
    })
    const sorted = Object.entries(byDay).sort(([a], [b]) => a.localeCompare(b))
    let acc = 0
    return sorted.map(([data, delta]) => {
      acc += delta
      return { data: data.slice(8), saldo: acc }
    })
  }, [lancamentos])

  const [year, month] = mes.split('-')
  const mesLabel = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  const isEmpty = lancamentos.length === 0

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold gradient-text">Resumo</h1>
          <p className="text-slate-400 text-sm capitalize">{mesLabel}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle modo */}
          {coupleId && (
            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
              {(['individual', 'casal'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                    mode === m
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
          {/* Filtro de mês */}
          <input
            type="month"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="glass rounded-2xl p-16 text-center text-slate-500 text-sm">
          Carregando...
        </div>
      ) : isEmpty ? (
        <div className="glass rounded-2xl p-16 text-center text-slate-500 text-sm">
          Nenhum lançamento em {mesLabel}.
        </div>
      ) : (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-5">
              <p className="text-slate-500 text-xs mb-1.5">Receitas</p>
              <p className="text-xl font-bold text-emerald-400">{fmt(receitas)}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="text-slate-500 text-xs mb-1.5">Despesas</p>
              <p className="text-xl font-bold text-red-400">{fmt(despesas)}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="text-slate-500 text-xs mb-1.5">Saldo</p>
              <p className={`text-xl font-bold ${saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {fmt(saldo)}
              </p>
            </div>
          </div>

          {/* Receitas vs Despesas */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-medium text-slate-300 mb-6">Receitas vs Despesas</h2>
            <BarChart receitas={receitas} despesas={despesas} />
          </div>

          {/* Evolução do saldo */}
          {evolucao.length > 1 && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-sm font-medium text-slate-300 mb-6">Evolução do saldo</h2>
              <LineChart pontos={evolucao} />
            </div>
          )}

          {/* Gastos por categoria */}
          {slicesCat.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-sm font-medium text-slate-300 mb-6">Gastos por categoria</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <DonutChart slices={slicesCat} total={despesas} label="despesas" />
                <div className="flex-1 w-full space-y-3">
                  {slicesCat.map((s) => (
                    <HorizontalBar
                      key={s.categoria}
                      label={s.categoria}
                      valor={s.total}
                      total={despesas}
                      cor={s.cor}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Receitas por categoria */}
          {slicesRec.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-sm font-medium text-slate-300 mb-6">Receitas por categoria</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <DonutChart slices={slicesRec} total={receitas} label="receitas" />
                <div className="flex-1 w-full space-y-3">
                  {slicesRec.map((s) => (
                    <HorizontalBar
                      key={s.categoria}
                      label={s.categoria}
                      valor={s.total}
                      total={receitas}
                      cor={s.cor}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Por pessoa (apenas casal) */}
          {mode === 'casal' && (pagouEu > 0 || pagouParceiro > 0) && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-sm font-medium text-slate-300 mb-6">Gastos por pessoa</h2>
              <div className="space-y-4">
                <PessoaBar
                  nome={myName}
                  valor={pagouEu}
                  total={pagouEu + pagouParceiro}
                  cor="#a78bfa"
                />
                <PessoaBar
                  nome={partnerName}
                  valor={pagouParceiro}
                  total={pagouEu + pagouParceiro}
                  cor="#60a5fa"
                />
                <div className="pt-3 border-t border-white/5 flex justify-between text-sm">
                  <span className="text-slate-500">Total despesas pagas</span>
                  <span className="font-bold">{fmt(pagouEu + pagouParceiro)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Gráfico de barras: Receitas vs Despesas ───────────────────────────────────

function BarChart({ receitas, despesas }: { receitas: number; despesas: number }) {
  const max = Math.max(receitas, despesas, 1)
  const H = 120
  const BAR_W = 56
  const GAP = 32
  const W = BAR_W * 2 + GAP + 60

  const hRec = (receitas / max) * H
  const hDes = (despesas / max) * H

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${W} ${H + 32}`} className="w-full max-w-xs">
        {/* Receitas */}
        <rect
          x={10}
          y={H - hRec}
          width={BAR_W}
          height={hRec}
          rx={6}
          fill="#34d399"
          fillOpacity={0.85}
        />
        <text x={10 + BAR_W / 2} y={H - hRec - 6} textAnchor="middle" fill="#34d399" fontSize={9}>
          {fmt(receitas)}
        </text>
        <text x={10 + BAR_W / 2} y={H + 14} textAnchor="middle" fill="#64748b" fontSize={9}>
          Receitas
        </text>

        {/* Despesas */}
        <rect
          x={10 + BAR_W + GAP}
          y={H - hDes}
          width={BAR_W}
          height={hDes}
          rx={6}
          fill="#f87171"
          fillOpacity={0.85}
        />
        <text
          x={10 + BAR_W + GAP + BAR_W / 2}
          y={H - hDes - 6}
          textAnchor="middle"
          fill="#f87171"
          fontSize={9}
        >
          {fmt(despesas)}
        </text>
        <text
          x={10 + BAR_W + GAP + BAR_W / 2}
          y={H + 14}
          textAnchor="middle"
          fill="#64748b"
          fontSize={9}
        >
          Despesas
        </text>

        {/* Linha base */}
        <line x1={0} y1={H} x2={W} y2={H} stroke="#ffffff" strokeOpacity={0.05} strokeWidth={1} />
      </svg>

      {/* Taxa de poupança */}
      {receitas > 0 && (
        <p className="text-xs text-slate-500">
          Taxa de poupança:{' '}
          <span className={`font-semibold ${saldo(receitas, despesas) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {receitas > 0 ? (((receitas - despesas) / receitas) * 100).toFixed(1) : '0'}%
          </span>
        </p>
      )}
    </div>
  )
}

function saldo(r: number, d: number) { return r - d }

// ─── Gráfico de linha: Evolução do saldo ──────────────────────────────────────

type Ponto = { data: string; saldo: number }

function LineChart({ pontos }: { pontos: Ponto[] }) {
  const W = 400
  const H = 100
  const PAD = 4

  const values = pontos.map((p) => p.saldo)
  const minV = Math.min(...values)
  const maxV = Math.max(...values)
  const range = maxV - minV || 1

  function x(i: number) {
    return PAD + (i / (pontos.length - 1)) * (W - PAD * 2)
  }
  function y(v: number) {
    return PAD + ((maxV - v) / range) * (H - PAD * 2)
  }

  const points = pontos.map((p, i) => `${x(i)},${y(p.saldo)}`).join(' ')

  // Área sob a curva
  const areaPoints =
    `${x(0)},${H} ` + points + ` ${x(pontos.length - 1)},${H}`

  const lastSaldo = pontos[pontos.length - 1].saldo
  const lineColor = lastSaldo >= 0 ? '#34d399' : '#f87171'

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full">
      {/* Linha zero */}
      {minV < 0 && maxV > 0 && (
        <line
          x1={0}
          y1={y(0)}
          x2={W}
          y2={y(0)}
          stroke="#ffffff"
          strokeOpacity={0.08}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      )}

      {/* Área */}
      <polygon points={areaPoints} fill={lineColor} fillOpacity={0.08} />

      {/* Linha */}
      <polyline
        points={points}
        fill="none"
        stroke={lineColor}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Ponto final */}
      <circle cx={x(pontos.length - 1)} cy={y(lastSaldo)} r={3} fill={lineColor} />

      {/* Labels eixo X (primeiro e último) */}
      <text x={x(0)} y={H + 14} textAnchor="middle" fill="#475569" fontSize={9}>
        {pontos[0].data}
      </text>
      <text
        x={x(pontos.length - 1)}
        y={H + 14}
        textAnchor="middle"
        fill="#475569"
        fontSize={9}
      >
        {pontos[pontos.length - 1].data}
      </text>

      {/* Label valor final */}
      <text
        x={x(pontos.length - 1) - 4}
        y={y(lastSaldo) - 8}
        textAnchor="end"
        fill={lineColor}
        fontSize={9}
        fontWeight="600"
      >
        {fmt(lastSaldo)}
      </text>
    </svg>
  )
}

// ─── Gráfico donut ─────────────────────────────────────────────────────────────

function DonutChart({
  slices,
  total,
  label,
}: {
  slices: Slice[]
  total: number
  label: string
}) {
  const CX = 70
  const CY = 70
  const R = 56
  const IR = 32
  let angle = -Math.PI / 2

  const paths = slices.map((s) => {
    const sweep = (s.total / total) * 2 * Math.PI
    const end = angle + sweep
    const large = sweep > Math.PI ? 1 : 0

    const x1o = CX + R * Math.cos(angle)
    const y1o = CY + R * Math.sin(angle)
    const x2o = CX + R * Math.cos(end)
    const y2o = CY + R * Math.sin(end)
    const x1i = CX + IR * Math.cos(end)
    const y1i = CY + IR * Math.sin(end)
    const x2i = CX + IR * Math.cos(angle)
    const y2i = CY + IR * Math.sin(angle)

    const d = `M ${x1o} ${y1o} A ${R} ${R} 0 ${large} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${IR} ${IR} 0 ${large} 0 ${x2i} ${y2i} Z`
    angle = end
    return { d, cor: s.cor, categoria: s.categoria }
  })

  return (
    <svg viewBox="0 0 140 140" className="w-32 h-32 shrink-0">
      {paths.map((p) => (
        <path key={p.categoria} d={p.d} fill={p.cor} stroke="#06060f" strokeWidth={2} />
      ))}
      <text x={CX} y={CY - 5} textAnchor="middle" fill="#94a3b8" fontSize={8}>
        {label}
      </text>
      <text x={CX} y={CY + 8} textAnchor="middle" fill="#f1f5f9" fontSize={9} fontWeight="600">
        {fmt(total)}
      </text>
    </svg>
  )
}

// ─── Barra horizontal por categoria ───────────────────────────────────────────

function HorizontalBar({
  label,
  valor,
  total,
  cor,
}: {
  label: string
  valor: number
  total: number
  cor: string
}) {
  const pct = total > 0 ? (valor / total) * 100 : 0
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300 truncate max-w-[140px]">{label}</span>
        <span className="text-slate-400 shrink-0 ml-2">
          {fmt(valor)}{' '}
          <span className="text-slate-600">· {pct.toFixed(1)}%</span>
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: cor }}
        />
      </div>
    </div>
  )
}

// ─── Barra por pessoa ──────────────────────────────────────────────────────────

function PessoaBar({
  nome,
  valor,
  total,
  cor,
}: {
  nome: string
  valor: number
  total: number
  cor: string
}) {
  const pct = total > 0 ? (valor / total) * 100 : 0
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium capitalize">{nome}</span>
        <span>
          {fmt(valor)}{' '}
          <span className="text-slate-500 text-xs">· {pct.toFixed(1)}%</span>
        </span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: cor }}
        />
      </div>
    </div>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
