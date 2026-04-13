'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Props = {
  mes: number
  ano: number
  /** Se fornecido, usa modo controlado (não navega via URL) */
  onSelect?: (mes: number, ano: number) => void
}

export default function MesSeletorButton({ mes, ano, onSelect }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const now = new Date()

  // Gera 13 meses anteriores + mês atual + 2 futuros
  const months: { mes: number; ano: number; label: string }[] = []
  for (let i = -13; i <= 2; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    months.push({
      mes: d.getMonth() + 1,
      ano: d.getFullYear(),
      label: d.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
    })
  }
  months.reverse()

  const selectedLabel = new Date(ano, mes - 1, 1).toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  function handleSelect(m: number, a: number) {
    if (onSelect) {
      onSelect(m, a)
    } else {
      router.push(`${pathname}?mes=${m}&ano=${a}`)
    }
    setOpen(false)
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white transition-colors"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-slate-500 shrink-0">
          <path d="M5 1a1 1 0 011 1v.5h4V2a1 1 0 012 0v.5h.5A1.5 1.5 0 0114 4v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13V4a1.5 1.5 0 011.5-1.5H4V2a1 1 0 011-1zm7 4H4v1h8V5z" />
        </svg>
        <span className="capitalize">{selectedLabel}</span>
        <svg
          className={`w-3 h-3 text-slate-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={2}
        >
          <polyline points="1,1 5,5 9,1" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-52 bg-[#16162a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-y-auto max-h-64">
          {months.map((m) => {
            const isSelected = m.mes === mes && m.ano === ano
            const isCurrent = m.mes === now.getMonth() + 1 && m.ano === now.getFullYear()
            return (
              <button
                key={`${m.ano}-${m.mes}`}
                onClick={() => handleSelect(m.mes, m.ano)}
                className={`w-full px-4 py-2.5 text-left text-sm capitalize transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-violet-600/20 text-violet-300'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {m.label}
                {isCurrent && !isSelected && (
                  <span className="text-[10px] text-slate-600">atual</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
