export interface CustomerInfo {
  name: string
  email: string
  phone: string
}

export interface LockTimer {
  expiresAt: number
  timerId: number
}

export interface BookingStore {
  selectedSeats: string[]
  customerInfo: CustomerInfo | null
  lockTimers: Record<string, LockTimer>

  // Actions (signature only)
  addToSelection: (seatId: string) => void
  removeFromSelection: (seatId: string) => void
  clearSelection: () => void
  setCustomerInfo: (info: CustomerInfo) => void
  clearCustomerInfo: () => void
  startLockTimer: (seatId: string, duration: number) => void
  clearLockTimer: (seatId: string) => void
  clearAllLockTimers: () => void
}
