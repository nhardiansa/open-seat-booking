import { create } from "zustand"
import type { Operator } from "./opertatorStore"

export interface RealtimeStatus {
  isLocked: boolean
  lockedBy: string | null
  lockedByName: string | null
  lockedAt: number | null
  expiresAt: number | null
  isPendingPayment: boolean
}

export interface Seat {
  id: string,
  position: {
    x: number,
    y: number
  },
  isDraggable?: boolean,
  seatNumber: string, // nomor kursi
  displaySeatNumber: string, // nomor kursi yang akan ditampilkan
  isManualNumber: boolean
  categoryId: string,  // kategori
  status: "available" | "selected" | "booked", // available | selected | booked
  // rotation: number       // untuk rotasi kursi (opsional)
  realtimeStatus: RealtimeStatus
}

interface SeatsStore {
  seats: Seat[]

  // actions
  addSeat: (seat: Seat) => void,
  bulkAddSeats: (seats: Seat[]) => void
  deleteSeat: (seatId: string) => void,
  updateSeat: (seat: Seat) => void,
  bulkUpdateSeats: (seats: Seat[]) => void,
  loadSeats: (seats: Seat[]) => void,

  // realtime actions
  lockSeat: (seatId: string, operator: Operator, duration: number) => void
  unlockSeat: (seatId: string) => void
  updateSeatRealtimeStatus: (seatId: string, status: Partial<RealtimeStatus>) => void
}

export const useSeatsStore = create<SeatsStore>()(
  (set) => ({
    seats: [],

    // actions
    addSeat: (seat: Seat) => set((state) => {
      return {
        ...state,
        seats: [...state.seats, seat],
      }
    }),
    bulkAddSeats: (seats: Seat[]) => set((state) => {
      return {
        ...state,
        seats: [...state.seats, ...seats],
      }
    }),
    deleteSeat: (seatId: string) => set((state) => ({
      ...state,
      seats: state.seats.filter((seat) => seat.id !== seatId),
    })),
    updateSeat: (seat: Seat) => set((state) => ({
      ...state,
      seats: state.seats.map((s) => (s.id === seat.id ? seat : s)),
    })),
    bulkUpdateSeats: (seats: Seat[]) => set((state) => ({
      ...state,
      seats: [...state.seats, ...seats],
    })),
    loadSeats: (seats: Seat[]) => set((state) => ({
      ...state,
      seats: [...state.seats, ...seats],
    })),

    // realtime actions
    lockSeat: (seatId: string, operator: Operator, duration: number) => set((state) => {
      return {
        ...state,
        seats: state.seats.map((seat) => (seat.id === seatId ? { ...seat, realtimeStatus: { ...seat.realtimeStatus, isLocked: true, lockedBy: operator.id, lockedByName: operator.name, lockedAt: Date.now(), expiresAt: Date.now() + duration } } : seat)),
      }
    }),
    unlockSeat: (seatId: string) => set((state) => {
      return {
        ...state,
        seats: state.seats.map((seat) => (seat.id === seatId ? { ...seat, realtimeStatus: { ...seat.realtimeStatus, isLocked: false, lockedBy: null, lockedByName: null, lockedAt: null, expiresAt: null } } : seat)),
      }
    }),
    updateSeatRealtimeStatus: (seatId: string, status: Partial<RealtimeStatus>) => set((state) => {
      return {
        ...state,
        seats: state.seats.map((seat) => (seat.id === seatId ? { ...seat, realtimeStatus: { ...seat.realtimeStatus, ...status } } : seat)),
      }
    }),
  })
)
