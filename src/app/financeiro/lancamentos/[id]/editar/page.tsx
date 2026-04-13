import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EditarLancamentoForm from './form'
import type { Lancamento } from '@/types/financeiro'

export default async function EditarPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('lancamentos')
    .select('*')
    .eq('id', id)
    .eq('user_id', user?.id ?? '')
    .single()

  if (!data) notFound()

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link
          href="/financeiro/lancamentos"
          className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
        >
          ← Lançamentos
        </Link>
        <h1 className="text-2xl font-bold mt-1">Editar Lançamento</h1>
      </header>
      <EditarLancamentoForm lancamento={data as Lancamento} />
    </div>
  )
}
