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

const PRESETS = [50, 60, 70]

type Props = {
  lancamento: Lancamento
  myEmail: string
  partnerEmail: string
}

export default function EditarLancamentoCasalForm({ lancamento, myEmail, partnerEmail }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tipo, setTipo] = useState<'receita' | 'despesa'>(
    lancamento.tipo === 'acerto' ? 'despesa' : lancamento.tipo
  )
  const [pagoPor, setPagoPor] = useState(lancamento.pago_por ?? myEmail)
  const [dividir, setDividir] = useState(lancamento.dividir)
  const [divisaoPct, setDivisaoPct] = useState(lancamento.divisao_percentual ?? 50)

  const myName = myEmail.split('@')[0]
  const partnerName = partnerEmail.split('@')[0]
  const pagadorNome = pagoPor === myEmail ? myName : partnerName
  const outroNome = pagoPor === myEmail ? partnerName : myName

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
        tipo,
        categoria: fd.get('categoria') as string,
        data: fd.get('data') as string,
        pago_por: pagoPor,
        dividir: tipo === 'despesa' ? dividir : false,
        divisao_percentual: tipo === 'despesa' && dividir ? divisaoPct : 100,
        observacao: (fd.get('observacao') as string) || null,
      })
      .eq('id', lancamento.id)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/financeiro/casal/lancamentos')
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
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as 'receita' | 'despesa')}
            required
            className={SELECT_CLS}
          >
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
        <label className="block text-xs text-slate-400 mb-1.5">Quem pagou</label>
        <select
          value={pagoPor}
          onChange={(e) => setPagoPor(e.target.value)}
          required
          className={SELECT_CLS}
        >
          <option value={myEmail}>{myName} (você)</option>
          {partnerEmail && <option value={partnerEmail}>{partnerName}</option>}
        </select>
      </div>

      {/* Divisão — só para despesas */}
      {tipo === 'despesa' && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setDividir((v) => !v)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
              dividir
                ? 'border-violet-500/50 bg-violet-600/10 text-violet-300'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-sm">Dividir esta despesa</span>
            <div className={`w-9 h-5 rounded-full transition-colors relative ${dividir ? 'bg-violet-600' : 'bg-white/10'}`}>
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${dividir ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
          </button>

          {dividir && (
            <div className="bg-white/5 rounded-xl p-4 space-y-3">
              {/* Presets */}
              <div className="flex gap-2">
                {PRESETS.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDivisaoPct(pct)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      divisaoPct === pct
                        ? 'bg-violet-600 text-white'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {pct}/{100 - pct}
                  </button>
                ))}
              </div>

              {/* Labels */}
              <div className="flex items-center justify-between text-xs">
                <div className="text-center">
                  <p className="text-slate-500 mb-0.5 capitalize">{pagadorNome}</p>
                  <p className="font-semibold text-white">{divisaoPct}%</p>
                </div>
                <div className="flex-1 mx-3 relative h-1.5 bg-white/10 rounded-full">
                  <div
                    className="absolute inset-y-0 left-0 bg-violet-500 rounded-full transition-all"
                    style={{ width: `${divisaoPct}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-slate-500 mb-0.5 capitalize">{outroNome}</p>
                  <p className="font-semibold text-white">{100 - divisaoPct}%</p>
                </div>
              </div>

              {/* Input customizado */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500 capitalize shrink-0">{pagadorNome}:</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={divisaoPct}
                  onChange={(e) => {
                    const v = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                    setDivisaoPct(v)
                  }}
                  className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:border-violet-500/50"
                />
                <span className="text-xs text-slate-500">%</span>
              </div>
            </div>
          )}
        </div>
      )}

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
          href="/financeiro/casal/lancamentos"
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
