'use client'

import { useTransition } from 'react'
import { deletarLancamento } from '../../actions'

export default function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('Deletar este lançamento?')) return
    startTransition(() => deletarLancamento(id))
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-xs text-slate-500 hover:text-red-400 disabled:opacity-50 transition-colors"
    >
      {pending ? '...' : 'Deletar'}
    </button>
  )
}
