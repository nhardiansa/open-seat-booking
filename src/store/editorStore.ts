import { create } from 'zustand';
import type { Seat, TicketCategory } from '@/types/editor';

interface EditorStore {
  seats: Seat[];
  selectedSeatId: string | null;
  categories: TicketCategory[];
  
  // Placement mode
  isPlacementMode: boolean;
  pendingSeats: Omit<Seat, 'id' | 'x' | 'y'>[];
  
  // Actions
  addSeat: (seat: Omit<Seat, 'id'>) => void;
  addBulkSeats: (seats: Omit<Seat, 'id'>[]) => void;
  updateSeat: (id: string, updates: Partial<Seat>) => void;
  deleteSeat: (id: string) => void;
  selectSeat: (id: string | null) => void;
  addCategory: (category: TicketCategory) => void;
  
  // Placement mode actions
  startPlacementMode: (rows: number, cols: number) => void;
  cancelPlacementMode: () => void;
  confirmPlacement: (x: number, y: number) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  seats: [],
  selectedSeatId: null,
  categories: [
    { id: '1', name: 'General Admission', color: '#ef4444', price: 100 },
    { id: '2', name: 'VIP', color: '#3b82f6', price: 250 },
    { id: '3', name: 'Regular', color: '#a3e635', price: 150 },
  ],
  
  isPlacementMode: false,
  pendingSeats: [],

  addSeat: (seat) => set((state) => ({
    seats: [
      ...state.seats,
      {
        ...seat,
        id: `seat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
    ],
  })),

  addBulkSeats: (seats) => set((state) => ({
    seats: [
      ...state.seats,
      ...seats.map((seat, index) => ({
        ...seat,
        id: `seat-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      })),
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

  startPlacementMode: (rows, cols) => {
    const pendingSeats: Omit<Seat, 'id' | 'x' | 'y'>[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pendingSeats.push({
          radius: 15,
          color: '#ef4444',
          label: '', // Empty label, to be defined later
        });
      }
    }
    
    set({
      isPlacementMode: true,
      pendingSeats,
    });
  },

  cancelPlacementMode: () => set({
    isPlacementMode: false,
    pendingSeats: [],
  }),

  confirmPlacement: (centerX, centerY) => set((state) => {
    if (!state.isPlacementMode || state.pendingSeats.length === 0) {
      return state;
    }

    // Calculate grid dimensions
    const cols = Math.ceil(Math.sqrt(state.pendingSeats.length));
    const rows = Math.ceil(state.pendingSeats.length / cols);
    const spacing = 35;
    
    // Calculate starting position to center the grid
    const gridWidth = (cols - 1) * spacing;
    const gridHeight = (rows - 1) * spacing;
    const startX = centerX - gridWidth / 2;
    const startY = centerY - gridHeight / 2;

    // Create seats with positions
    const newSeats = state.pendingSeats.map((seat, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      return {
        ...seat,
        id: `seat-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        x: startX + col * spacing,
        y: startY + row * spacing,
      };
    });

    return {
      seats: [...state.seats, ...newSeats],
      isPlacementMode: false,
      pendingSeats: [],
    };
  }),
}));

