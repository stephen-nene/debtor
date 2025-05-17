export interface Debt {
  id: string
  debtor: string
  amount: number
  dueDate: string
  location: string
  description: string
  isPaid: boolean
  createdAt: string
}
