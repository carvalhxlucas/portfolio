'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIAS_INVESTIMENTO } from '@/types/financeiro'

const INPUT_CLS =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors'
const SELECT_CLS =
  'w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors'

type Props = { coupleId: string | null }

export default function NovoInvestimentoForm({ coupleId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scope, setScope] = useState<'individual' | 'casal'>('individual')

  const hoje = new Date().toISOString().split('T')[0]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const fd = new FormData(e.currentTarget)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/financeiro/login')
      return
    }

    const isCasal = scope === 'casal' && coupleId

    const { error } = await supabase.from('investimentos').insert({
      user_id: isCasal ? null : user.id,
      couple_id: isCasal ? coupleId : null,
      descricao: fd.get('descricao') as string,
      valor: parseFloat(fd.get('valor') as string),
      tipo: fd.get('tipo') as 'aporte' | 'resgate' | 'rendimento',
      categoria: fd.get('categoria') as string,
      data: fd.get('data') as string,
      observacao: (fd.get('observacao') as string) || null,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/financeiro/investimentos')
    router.refresh()
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link
          href="/financeiro/investimentos"
          className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
        >
          ← Investimentos
        </Link>
        <h1 className="text-2xl font-bold mt-1">Novo Investimento</h1>
      </header>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
        {coupleId && (
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Conta</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setScope('individual')}
                className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                  scope === 'individual'
                    ? 'bg-violet-600 text-white'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setScope('casal')}
                className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                  scope === 'casal'
                    ? 'bg-violet-600 text-white'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                Casal
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Descrição</label>
          <input
            name="descricao"
            required
            type="text"
            placeholder="Ex: Tesouro Selic 2029"
            className={INPUT_CLS}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Valor (R$)</label>
            <input
              name="valor"
              required
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Tipo</label>
            <select name="tipo" required defaultValue="aporte" className={SELECT_CLS}>
              <option value="aporte">Aporte</option>
              <option value="resgate">Resgate</option>
              <option value="rendimento">Rendimento</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Categoria</label>
            <select name="categoria" required className={SELECT_CLS}>
              {CATEGORIAS_INVESTIMENTO.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Data</label>
            <input
              name="data"
              required
              type="date"
              defaultValue={hoje}
              className={INPUT_CLS}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">
            Observação <span className="text-slate-600">(opcional)</span>
          </label>
          <textarea
            name="observacao"
            rows={2}
            placeholder="Adicione uma observação..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Link
            href="/financeiro/investimentos"
            className="flex-1 text-center py-2.5 glass rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-2.5 text-sm font-medium transition-colors"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
}
