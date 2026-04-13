export type Lancamento = {
  id: string
  user_id: string
  couple_id: string | null
  descricao: string
  valor: number
  tipo: 'receita' | 'despesa'
  categoria: string
  data: string
  pago_por: string | null
  created_at: string
}

export type Investimento = {
  id: string
  user_id: string | null
  couple_id: string | null
  descricao: string
  valor: number
  tipo: 'aporte' | 'resgate' | 'rendimento'
  categoria: string
  data: string
  created_at: string
}

export type Couple = {
  id: string
  user1_id: string
  user2_id: string
  created_at: string
}

export type Profile = {
  id: string
  email: string
  nome: string | null
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

export const CATEGORIAS_INVESTIMENTO = [
  'Tesouro Direto',
  'CDB',
  'LCI/LCA',
  'Ações',
  'FII',
  'ETF',
  'Renda Fixa',
  'Cripto',
  'Previdência',
  'Outros',
] as const

export type Categoria = (typeof CATEGORIAS)[number]
export type CategoriaInvestimento = (typeof CATEGORIAS_INVESTIMENTO)[number]
