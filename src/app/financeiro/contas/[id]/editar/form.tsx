'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CATEGORIAS, type Conta } from '@/types/financeiro'

const INPUT_CLS =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors'
const SELECT_CLS =
  'w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors'

type Props = {
  conta: Conta
  myEmail: string
  partnerEmail: string | null
}

export default function EditarContaForm({ conta, myEmail, partnerEmail }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recorrente, setRecorrente] = useState(conta.recorrente)

  const isCasal = !!conta.couple_id
  const myName = myEmail.split('@')[0]
  const partnerName = partnerEmail?.split('@')[0] ?? ''

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const fd = new FormData(e.currentTarget)
    const supabase = createClient()

    const vencimento = fd.get('vencimento') as string
    const diaVencimento = recorrente ? parseInt(vencimento.split('-')[2]) : null

    const { error } = await supabase
      .from('contas')
      .update({
        descricao: fd.get('descricao') as string,
        valor: parseFloat(fd.get('valor') as string),
        tipo: fd.get('tipo') as 'pagar' | 'receber',
        categoria: fd.get('categoria') as string,
        vencimento,
        pago_por: (fd.get('pago_por') as string) || null,
        recorrente,
        dia_vencimento: diaVencimento,
      })
      .eq('id', conta.id)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/financeiro/contas')
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
          defaultValue={conta.descricao}
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
            defaultValue={conta.valor}
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Tipo</label>
          <select name="tipo" required defaultValue={conta.tipo} className={SELECT_CLS}>
            <option value="pagar">A pagar</option>
            <option value="receber">A receber</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Categoria</label>
          <select name="categoria" required defaultValue={conta.categoria} className={SELECT_CLS}>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Vencimento</label>
          <input
            name="vencimento"
            required
            type="date"
            defaultValue={conta.vencimento}
            className={INPUT_CLS}
          />
        </div>
      </div>

      {isCasal && partnerEmail && (
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">
            Responsável <span className="text-slate-600">(opcional)</span>
          </label>
          <select name="pago_por" defaultValue={conta.pago_por ?? ''} className={SELECT_CLS}>
            <option value="">Não definido</option>
            <option value={myEmail}>{myName} (você)</option>
            <option value={partnerEmail}>{partnerName}</option>
          </select>
        </div>
      )}

      {/* Recorrente */}
      <button
        type="button"
        onClick={() => setRecorrente((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
          recorrente
            ? 'border-violet-500/50 bg-violet-600/10 text-violet-300'
            : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
        }`}
      >
        <span className="text-sm">Conta recorrente (mensal)</span>
        <div className={`w-9 h-5 rounded-full transition-colors relative ${recorrente ? 'bg-violet-600' : 'bg-white/10'}`}>
          <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${recorrente ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </div>
      </button>
      {recorrente && (
        <p className="text-xs text-slate-500 -mt-2">
          Ao pagar, a próxima ocorrência será criada automaticamente no mesmo dia do mês seguinte.
        </p>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Link
          href="/financeiro/contas"
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
