'use client'

import { useActionState } from 'react'
import { vincularCasal } from '../actions'

const INPUT_CLS =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-colors'

export default function VincularForm() {
  const [state, formAction, pending] = useActionState(vincularCasal, null)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-xs text-slate-400 mb-1.5">E-mail da parceira</label>
        <input
          name="email"
          type="email"
          required
          placeholder="parceira@email.com"
          className={INPUT_CLS}
        />
      </div>
      {state?.error && <p className="text-red-400 text-xs">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-2.5 text-sm font-medium transition-colors"
      >
        {pending ? 'Vinculando...' : 'Vincular casal'}
      </button>
    </form>
  )
}
