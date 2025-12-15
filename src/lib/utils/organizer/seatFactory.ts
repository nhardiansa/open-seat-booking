import type { Seat } from '@/lib/stores/seatsStore'
import { nanoid } from 'nanoid'
// import { SEAT_RADIUS } from '@/constants'
// import type { Seat, Position } from '@/types'

interface CreateSeatOptions {
  category?: 'vip' | 'regular' | 'economy'
  price?: number
  radius?: number
  status?: 'available' | 'selected' | 'booked'
  isManualNumber?: boolean
}

export function createSeatObject(
  position: { x: number, y: number },
  seatNumber: string,
  options: CreateSeatOptions = {}
): Seat {

  const {
    category = 'regular',
    status = 'available',
    isManualNumber = false,
  } = options

  return {
    id: nanoid(),
    categoryId: category,
    displaySeatNumber: seatNumber,
    position,
    seatNumber,
    isManualNumber,
    status,
    realtimeStatus: {
      isLocked: false,
      lockedBy: null,
      lockedByName: null,
      lockedAt: null,
      expiresAt: null,
      isPendingPayment: false,
    },
  }
}
