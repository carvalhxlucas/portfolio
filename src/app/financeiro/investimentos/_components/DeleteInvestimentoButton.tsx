'use client'

import { useTransition } from 'react'

export default function DeleteInvestimentoButton({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<void>
}) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('Deletar este investimento?')) return
    startTransition(() => action(id))
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
