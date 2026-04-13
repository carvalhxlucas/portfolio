'use client'

import { useState } from 'react'

export default function ObservacaoIcon({ observacao }: { observacao: string | null }) {
  const [open, setOpen] = useState(false)

  if (!observacao) return null

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        title={observacao}
        className={`transition-colors ${open ? 'text-violet-400' : 'text-slate-600 hover:text-slate-400'}`}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v5a2 2 0 01-2 2H6l-3 3V4z" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 right-0 w-56 bg-[#16162a] border border-white/10 rounded-xl shadow-2xl p-3 z-50">
          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{observacao}</p>
          <div className="absolute bottom-[-5px] right-2 w-2.5 h-2.5 bg-[#16162a] border-r border-b border-white/10 rotate-45" />
        </div>
      )}
    </div>
  )
}
