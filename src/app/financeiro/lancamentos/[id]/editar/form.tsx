'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIAS, type Lancamento } from '@/types/financeiro'

const INPUT_CLS =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors'
const SELECT_CLS =
  'w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors'

export default function EditarLancamentoForm({ lancamento }: { lancamento: Lancamento }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const fd = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase
      .from('lancamentos')
      .update({
        descricao: fd.get('descricao') as string,
        valor: parseFloat(fd.get('valor') as string),
        tipo: fd.get('tipo') as 'receita' | 'despesa',
        categoria: fd.get('categoria') as string,
        data: fd.get('data') as string,
        pago_por: (fd.get('pago_por') as string) || null,
        observacao: (fd.get('observacao') as string) || null,
      })
      .eq('id', lancamento.id)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/financeiro/lancamentos')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
      <div>
        <label className="block text-xs text-slate-400 mb-1.5">Descrição</label>
        <input
          name="descricao"
          required
          type="text"
          defaultValue={lancamento.descricao}
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
            defaultValue={lancamento.valor}
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Tipo</label>
          <select name="tipo" required defaultValue={lancamento.tipo} className={SELECT_CLS}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Categoria</label>
          <select name="categoria" required defaultValue={lancamento.categoria} className={SELECT_CLS}>
            {CATEGORIAS.map((cat) => (
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
            defaultValue={lancamento.data}
            className={INPUT_CLS}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1.5">
          Pago por <span className="text-slate-600">(opcional)</span>
        </label>
        <input
          name="pago_por"
          type="text"
          defaultValue={lancamento.pago_por ?? ''}
          className={INPUT_CLS}
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1.5">
          Observação <span className="text-slate-600">(opcional)</span>
        </label>
        <textarea
          name="observacao"
          rows={2}
          placeholder="Adicione uma observação..."
          defaultValue={lancamento.observacao ?? ''}
          className={INPUT_CLS + ' resize-none'}
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Link
          href="/financeiro/lancamentos"
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
  )
}
