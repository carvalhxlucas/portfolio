import Link from 'next/link'
import { logout } from '../actions'

type Tab = 'individual' | 'casal' | 'contas' | 'investimentos' | 'resumo' | 'configuracoes'

const TABS = [
  { key: 'individual', href: '/financeiro', label: 'Individual' },
  { key: 'casal', href: '/financeiro/casal', label: 'Casal' },
  { key: 'investimentos', href: '/financeiro/investimentos', label: 'Investimentos' },
  { key: 'resumo', href: '/financeiro/resumo', label: 'Resumo' },
] as const

export default function Nav({ active }: { active: Tab }) {
  return (
    <header className="border-b border-white/5 mb-8">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <nav className="flex gap-1">
          {TABS.map((tab) => (
            <Link
              key={tab.key}
              href={tab.href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                active === tab.key
                  ? 'bg-violet-600/20 text-violet-300 font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/financeiro/configuracoes"
            className={`text-sm transition-colors ${
              active === 'configuracoes'
                ? 'text-violet-300'
                : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Configurações"
          >
            ⚙
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs text-slate-500 hover:text-red-400 transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
