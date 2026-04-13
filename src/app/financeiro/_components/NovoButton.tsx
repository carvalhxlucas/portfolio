'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

type Option = {
  label: string
  href: string
}

export default function NovoButton({ options }: { options: Option[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-violet-600 hover:bg-violet-500 text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
      >
        + Novo
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 10 6"
          stroke="currentColor"
          strokeWidth={2}
        >
          <polyline points="1,1 5,5 9,1" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-[#16162a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
          {options.map((opt) => (
            <Link
              key={opt.href}
              href={opt.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors"
            >
              {opt.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
