'use client'

import { useState, useMemo, useTransition } from 'react'
import Link from 'next/link'
import { pagarConta, despagarConta, deletarConta } from '../actions'
import type { Conta } from '@/types/financeiro'

type Mode = 'individual' | 'casal'
type Filtro = 'todas' | 'pagar' | 'receber' | 'pagas'

type Props = {
  individuais: Conta[]
  casal: Conta[]
  coupleId: string | null
  myEmail: string
  partnerEmail: string | null
  defaultMode: Mode
}

export default function ContasClient({
  individuais,
  casal,
  coupleId,
  myEmail,
  partnerEmail,
  defaultMode,
}: Props) {
  const [mode, setMode] = useState<Mode>(defaultMode)
  const [filtro, setFiltro] = useState<Filtro>('todas')

  const todas = mode === 'individual' ? individuais : casal

  const filtradas = useMemo(() => {
    let list = todas
    if (filtro === 'pagar') list = list.filter((c) => c.tipo === 'pagar' && !c.pago)
    else if (filtro === 'receber') list = list.filter((c) => c.tipo === 'receber' && !c.pago)
    else if (filtro === 'pagas') list = list.filter((c) => c.pago)
    else list = list.filter((c) => !c.pago) // "todas" = todas as pendentes

    // Ordenação: vencidas → hoje → futuras
    const today = todayStr()
    return [...list].sort((a, b) => {
      if (filtro === 'pagas') return (b.pago_em ?? '').localeCompare(a.pago_em ?? '')
      return a.vencimento.localeCompare(b.vencimento)
    })
  }, [todas, filtro])

  // KPIs
  const pendentes = todas.filter((c) => !c.pago)
  const totalPagar = pendentes
    .filter((c) => c.tipo === 'pagar')
    .reduce((s, c) => s + Number(c.valor), 0)
  const totalReceber = pendentes
    .filter((c) => c.tipo === 'receber')
    .reduce((s, c) => s + Number(c.valor), 0)
  const today = todayStr()
  const vencidas = pendentes.filter((c) => c.vencimento < today).length

  const FILTROS: { key: Filtro; label: string }[] = [
    { key: 'todas', label: 'Pendentes' },
    { key: 'pagar', label: 'A pagar' },
    { key: 'receber', label: 'A receber' },
    { key: 'pagas', label: 'Pagas / Recebidas' },
  ]

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold gradient-text">Contas</h1>
          <p className="text-slate-400 text-sm">A pagar e a receber</p>
        </div>
        <div className="flex items-center gap-3">
          {coupleId && (
            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
              {(['individual', 'casal'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                    mode === m ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
          <Link
            href={`/financeiro/contas/nova${mode === 'casal' ? '?modo=casal' : ''}`}
            className="bg-violet-600 hover:bg-violet-500 text-sm px-4 py-2 rounded-lg transition-colors"
          >
            + Nova
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-5">
          <p className="text-slate-500 text-xs mb-1.5">A pagar</p>
          <p className="text-xl font-bold text-red-400">{fmt(totalPagar)}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-slate-500 text-xs mb-1.5">A receber</p>
          <p className="text-xl font-bold text-emerald-400">{fmt(totalReceber)}</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-slate-500 text-xs mb-1.5">Vencidas</p>
          <p className={`text-xl font-bold ${vencidas > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
            {vencidas}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {FILTROS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              filtro === f.key
                ? 'bg-violet-600/20 text-violet-300'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="glass rounded-2xl overflow-hidden">
        {filtradas.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">Nenhuma conta aqui.</p>
            <Link
              href={`/financeiro/contas/nova${mode === 'casal' ? '?modo=casal' : ''}`}
              className="text-violet-400 text-sm hover:underline mt-2 inline-block"
            >
              Criar primeira conta
            </Link>
          </div>
        ) : (
          <ul>
            {filtradas.map((conta, i) => (
              <ContaItem
                key={conta.id}
                conta={conta}
                isLast={i === filtradas.length - 1}
                mode={mode}
                myEmail={myEmail}
                partnerEmail={partnerEmail}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// ─── Item da lista ─────────────────────────────────────────────────────────────

function ContaItem({
  conta,
  isLast,
  mode,
  myEmail,
  partnerEmail,
}: {
  conta: Conta
  isLast: boolean
  mode: Mode
  myEmail: string
  partnerEmail: string | null
}) {
  const [pending, startTransition] = useTransition()
  const today = todayStr()

  const isVencida = !conta.pago && conta.vencimento < today
  const isHoje = !conta.pago && conta.vencimento === today

  function handleTogglePago() {
    startTransition(() => {
      if (conta.pago) despagarConta(conta.id)
      else pagarConta(conta.id)
    })
  }

  function handleDelete() {
    if (!confirm('Deletar esta conta?')) return
    startTransition(() => deletarConta(conta.id))
  }

  const pagorNome =
    conta.pago_por === myEmail
      ? myEmail.split('@')[0]
      : conta.pago_por === partnerEmail
      ? partnerEmail?.split('@')[0]
      : conta.pago_por

  return (
    <li
      className={`flex items-center gap-4 px-5 py-4 ${!isLast ? 'border-b border-white/5' : ''} ${
        pending ? 'opacity-50' : ''
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={handleTogglePago}
        disabled={pending}
        className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
          conta.pago
            ? 'bg-emerald-500 border-emerald-500'
            : isVencida
            ? 'border-amber-400 hover:border-amber-300'
            : 'border-white/20 hover:border-violet-400'
        }`}
        title={conta.pago ? 'Marcar como pendente' : 'Marcar como pago'}
      >
        {conta.pago && (
          <svg viewBox="0 0 10 10" className="w-full p-0.5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        )}
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-medium truncate ${conta.pago ? 'line-through text-slate-500' : ''}`}>
            {conta.descricao}
          </p>
          <span
            className={`text-xs px-1.5 py-0.5 rounded font-medium ${
              conta.tipo === 'pagar'
                ? 'bg-red-500/15 text-red-400'
                : 'bg-emerald-500/15 text-emerald-400'
            }`}
          >
            {conta.tipo === 'pagar' ? 'a pagar' : 'a receber'}
          </span>
          {conta.recorrente && (
            <span className="text-xs px-1.5 py-0.5 rounded font-medium bg-violet-500/15 text-violet-400">
              ↻ mensal
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs text-slate-500">{conta.categoria}</span>
          <span className="text-slate-700">·</span>
          <span className={`text-xs font-medium ${
            conta.pago
              ? 'text-slate-500'
              : isVencida
              ? 'text-amber-400'
              : isHoje
              ? 'text-yellow-400'
              : 'text-slate-400'
          }`}>
            {conta.pago
              ? `Pago em ${fmtDate(conta.pago_em?.slice(0, 10) ?? conta.vencimento)}`
              : isVencida
              ? `Venceu ${diffDays(conta.vencimento)} dias atrás`
              : isHoje
              ? 'Vence hoje'
              : `Vence em ${diffDays(conta.vencimento)} dias`}
          </span>
          {mode === 'casal' && pagorNome && (
            <>
              <span className="text-slate-700">·</span>
              <span className="text-xs text-slate-500">{pagorNome}</span>
            </>
          )}
        </div>
      </div>

      {/* Valor + ações */}
      <div className="flex items-center gap-4 shrink-0">
        <span className={`text-sm font-bold tabular-nums ${
          conta.pago
            ? 'text-slate-500'
            : conta.tipo === 'pagar'
            ? 'text-red-400'
            : 'text-emerald-400'
        }`}>
          {conta.tipo === 'pagar' ? '-' : '+'}{fmt(Number(conta.valor))}
        </span>
        <div className="flex gap-3">
          <Link
            href={`/financeiro/contas/${conta.id}/editar`}
            className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            disabled={pending}
            className="text-xs text-slate-500 hover:text-red-400 disabled:opacity-50 transition-colors"
          >
            Deletar
          </button>
        </div>
      </div>
    </li>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function todayStr() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function diffDays(dateStr: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr + 'T00:00:00')
  return Math.abs(Math.round((d.getTime() - today.getTime()) / 86400000))
}

function fmtDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
