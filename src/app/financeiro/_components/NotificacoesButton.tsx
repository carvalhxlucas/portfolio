'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export type Notificacao = {
  id: string
  descricao: string
  valor: number
  tipo: 'pagar' | 'receber'
  vencimento: string
  couple_id: string | null
}

function todayStr() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function diffDays(dateStr: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr + 'T00:00:00')
  return Math.round((d.getTime() - today.getTime()) / 86400000)
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export default function NotificacoesButton({ notificacoes }: { notificacoes: Notificacao[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const today = todayStr()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const count = notificacoes.length

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative text-slate-500 hover:text-slate-300 transition-colors p-1"
        title="Notificações"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10 2a6 6 0 00-6 6v2.586l-.707.707A1 1 0 004 13h12a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#16162a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-sm font-medium">Notificações</span>
            {count > 0 && (
              <span className="text-xs text-amber-400">{count} {count === 1 ? 'conta' : 'contas'}</span>
            )}
          </div>

          {count === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-xs text-slate-500">Nenhuma conta vencendo em breve.</p>
            </div>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {notificacoes.map((n, i) => {
                const days = diffDays(n.vencimento)
                const isVencida = days < 0
                const isHoje = days === 0

                return (
                  <li
                    key={n.id}
                    className={`px-4 py-3 ${i < notificacoes.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{n.descricao}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          {n.couple_id && (
                            <span className="text-[10px] bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded">
                              casal
                            </span>
                          )}
                          <span
                            className={`text-xs font-medium ${
                              isVencida
                                ? 'text-red-400'
                                : isHoje
                                ? 'text-yellow-400'
                                : 'text-amber-400'
                            }`}
                          >
                            {isVencida
                              ? `Venceu há ${Math.abs(days)} ${Math.abs(days) === 1 ? 'dia' : 'dias'}`
                              : isHoje
                              ? 'Vence hoje'
                              : `Vence em ${days} ${days === 1 ? 'dia' : 'dias'}`}
                          </span>
                          <span className="text-slate-700 text-xs">·</span>
                          <span className="text-xs text-slate-500">{fmtDate(n.vencimento)}</span>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-bold tabular-nums shrink-0 ${
                          n.tipo === 'pagar' ? 'text-red-400' : 'text-emerald-400'
                        }`}
                      >
                        {n.tipo === 'pagar' ? '-' : '+'}{fmt(n.valor)}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="px-4 py-2.5 border-t border-white/5">
            <Link
              href="/financeiro/contas"
              onClick={() => setOpen(false)}
              className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
            >
              Ver todas as contas →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
