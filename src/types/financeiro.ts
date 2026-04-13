export type Lancamento = {
  id: string
  user_id: string
  descricao: string
  valor: number
  tipo: 'receita' | 'despesa'
  categoria: string
  data: string
  pago_por: string | null
  created_at: string
}

export const CATEGORIAS = [
  'Alimentação',
  'Assinaturas',
  'Educação',
  'Freelance',
  'Investimento',
  'Lazer',
  'Moradia',
  'Pets',
  'Saúde',
  'Salário',
  'Transporte',
  'Vestuário',
  'Outros',
] as const

export type Categoria = (typeof CATEGORIAS)[number]
