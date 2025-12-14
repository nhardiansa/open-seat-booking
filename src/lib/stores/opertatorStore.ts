type OperatorRole = 'organizer' | 'operator' | 'customer'

export interface Operator {
  id: string
  name: string
  role: OperatorRole
  color: string
  connectedAt: number
}

interface ActiveOperator {
  id: string
  name: string
  color: string
  lastActivity: number
  lockedSeatsCount: number
}

export interface OperatorsStore {
  currentOperator: Operator | null
  activeOperators: ActiveOperator[]

  // Actions (signature only)
  setCurrentOperator: (operator: Operator) => void
  clearCurrentOperator: () => void
  addOperator: (operator: ActiveOperator) => void
  removeOperator: (operatorId: string) => void
  updateOperatorActivity: (operatorId: string, timestamp: number) => void
  updateLockedSeatsCount: (operatorId: string, count: number) => void
}
