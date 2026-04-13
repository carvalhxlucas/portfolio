import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '../actions'
import NotificacoesButton, { type Notificacao } from './NotificacoesButton'

type Tab = 'individual' | 'casal' | 'contas' | 'resumo' | 'configuracoes'

const TABS = [
  { key: 'individual', href: '/financeiro', label: 'Individual' },
  { key: 'casal', href: '/financeiro/casal', label: 'Casal' },
  { key: 'resumo', href: '/financeiro/resumo', label: 'Resumo' },
] as const

export default async function Nav({ active }: { active: Tab }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let notificacoes: Notificacao[] = []

  if (user) {
    const now = new Date()
    const in5Days = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)
    const deadline = `${in5Days.getFullYear()}-${String(in5Days.getMonth() + 1).padStart(2, '0')}-${String(in5Days.getDate()).padStart(2, '0')}`

    const { data } = await supabase
      .from('contas')
      .select('id, descricao, valor, tipo, vencimento, couple_id')
      .eq('pago', false)
      .lte('vencimento', deadline)
      .order('vencimento', { ascending: true })

    notificacoes = (data ?? []) as Notificacao[]
  }

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
          <NotificacoesButton notificacoes={notificacoes} />
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
