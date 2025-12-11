import { create } from 'zustand';
import type { Seat, TicketCategory } from '@/types/editor';

interface EditorStore {
  seats: Seat[];
  selectedSeatId: string | null;
  categories: TicketCategory[];
  
  // Actions
  addSeat: (seat: Omit<Seat, 'id'>) => void;
  updateSeat: (id: string, updates: Partial<Seat>) => void;
  deleteSeat: (id: string) => void;
  selectSeat: (id: string | null) => void;
  addCategory: (category: TicketCategory) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  seats: [],
  selectedSeatId: null,
  categories: [
    { id: '1', name: 'General Admission', color: '#ef4444', price: 100 },
    { id: '2', name: 'VIP', color: '#3b82f6', price: 250 },
    { id: '3', name: 'Regular', color: '#a3e635', price: 150 },
  ],

  addSeat: (seat) => set((state) => ({
    seats: [
      ...state.seats,
      {
        ...seat,
        id: `seat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
    ],
  })),

  updateSeat: (id, updates) => set((state) => ({
    seats: state.seats.map((seat) =>
      seat.id === id ? { ...seat, ...updates } : seat
    ),
  })),

  deleteSeat: (id) => set((state) => ({
    seats: state.seats.filter((seat) => seat.id !== id),
    selectedSeatId: state.selectedSeatId === id ? null : state.selectedSeatId,
  })),

  selectSeat: (id) => set({ selectedSeatId: id }),

  addCategory: (category) => set((state) => ({
    categories: [...state.categories, category],
  })),
}));
