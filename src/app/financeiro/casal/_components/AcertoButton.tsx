'use client'

import { useState, useTransition } from 'react'
import { acertarConta } from '../../actions'

type Props = {
  coupleId: string
  valor: number
  pagadorEmail: string
  pagadorNome: string
  receptorNome: string
}

export default function AcertoButton({
  coupleId,
  valor,
  pagadorEmail,
  pagadorNome,
  receptorNome,
}: Props) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setError(null)
    startTransition(async () => {
      try {
        await acertarConta(fd)
        setOpen(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao registrar acerto')
      }
    })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-3 w-full py-2 rounded-lg text-xs font-medium border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors"
      >
        Registrar acerto
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3">
      <p className="text-xs text-slate-400">
        <span className="capitalize font-medium text-white">{pagadorNome}</span> pagou para{' '}
        <span className="capitalize font-medium text-white">{receptorNome}</span>
      </p>

      <input type="hidden" name="coupleId" value={coupleId} />
      <input type="hidden" name="pagadorEmail" value={pagadorEmail} />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-slate-500 mb-1">Valor (R$)</label>
          <input
            name="valor"
            type="number"
            step="0.01"
            min="0.01"
            required
            defaultValue={valor.toFixed(2)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Descrição</label>
          <input
            name="descricao"
            type="text"
            placeholder="Acerto de conta"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex-1 py-2 rounded-lg text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="flex-1 py-2 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 disabled:opacity-50 transition-colors"
        >
          {pending ? 'Salvando...' : 'Confirmar acerto'}
        </button>
      </div>
    </form>
  )
}
