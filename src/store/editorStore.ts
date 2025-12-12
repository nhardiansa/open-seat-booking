import { create } from 'zustand';
import type { Seat, TicketCategory } from '@/types/editor';

interface EditorStore {
  seats: Seat[];
  selectedSeatId: string | null;
  selectedSeatIds: string[]; // For multiple selection
  categories: TicketCategory[];
  
  // Placement mode
  isPlacementMode: boolean;
  pendingSeats: Omit<Seat, 'id' | 'x' | 'y'>[];
  gridRows: number;
  gridCols: number;
  
  // History for undo/redo
  history: Seat[][];
  historyIndex: number;
  maxHistory: number;
  
  // Actions
  addSeat: (seat: Omit<Seat, 'id'>) => void;
  addBulkSeats: (seats: Omit<Seat, 'id'>[]) => void;
  updateSeat: (id: string, updates: Partial<Seat>) => void;
  deleteSeat: (id: string) => void;
  selectSeat: (id: string | null) => void;
  addCategory: (category: TicketCategory) => void;
  
  // Multiple selection actions
  selectMultipleSeats: (ids: string[]) => void;
  clearSelection: () => void;
  toggleSeatSelection: (id: string) => void;
  
  // Placement mode actions
  startPlacementMode: (rows: number, cols: number) => void;
  cancelPlacementMode: () => void;
  confirmPlacement: (x: number, y: number) => void;
  
  // History actions
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  seats: [],
  selectedSeatId: null,
  selectedSeatIds: [],
  categories: [
    { id: '1', name: 'General Admission', color: '#ef4444', price: 100 },
    { id: '2', name: 'VIP', color: '#3b82f6', price: 250 },
    { id: '3', name: 'Regular', color: '#a3e635', price: 150 },
  ],
  
  isPlacementMode: false,
  pendingSeats: [],
  gridRows: 0,
  gridCols: 0,
  
  // History state
  history: [[]],
  historyIndex: 0,
  maxHistory: 50,

  // Save current state to history
  saveHistory: () => {
    set((state) => {
      const currentSeats = JSON.parse(JSON.stringify(state.seats)) as Seat[];
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(currentSeats);
      
      // Limit history size
      if (newHistory.length > state.maxHistory) {
        newHistory.shift();
      }
      
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  // Undo action
  undo: () => {
    const state = get();
    if (state.canUndo()) {
      const previousSeats = state.history[state.historyIndex - 1];
      set({
        seats: JSON.parse(JSON.stringify(previousSeats)) as Seat[],
        historyIndex: state.historyIndex - 1,
      });
    }
  },

  // Redo action
  redo: () => {
    const state = get();
    if (state.canRedo()) {
      const nextSeats = state.history[state.historyIndex + 1];
      set({
        seats: JSON.parse(JSON.stringify(nextSeats)) as Seat[],
        historyIndex: state.historyIndex + 1,
      });
    }
  },

  // Check if can undo
  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },

  // Check if can redo
  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  addSeat: (seat) => {
    set((state) => {
      const newSeats = [
        ...state.seats,
        {
          ...seat,
          id: `seat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        },
      ];
      return { seats: newSeats };
    });
    get().saveHistory();
  },

  addBulkSeats: (seats) => {
    set((state) => {
      const newSeats = [
        ...state.seats,
        ...seats.map((seat, index) => ({
          ...seat,
          id: `seat-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        })),
      ];
      return { seats: newSeats };
    });
    get().saveHistory();
  },

  updateSeat: (id, updates) => {
    set((state) => ({
      seats: state.seats.map((seat) =>
        seat.id === id ? { ...seat, ...updates } : seat
      ),
    }));
    get().saveHistory();
  },

  deleteSeat: (id) => {
    set((state) => ({
      seats: state.seats.filter((seat) => seat.id !== id),
      selectedSeatId: state.selectedSeatId === id ? null : state.selectedSeatId,
      selectedSeatIds: state.selectedSeatIds.filter((seatId) => seatId !== id),
    }));
    get().saveHistory();
  },

  selectSeat: (id) => set({ 
    selectedSeatId: id,
    selectedSeatIds: id ? [id] : [],
  }),

  // Multiple selection actions
  selectMultipleSeats: (ids) => set({ 
    selectedSeatIds: ids,
    selectedSeatId: ids.length === 1 ? ids[0] : null,
  }),

  clearSelection: () => set({ 
    selectedSeatId: null,
    selectedSeatIds: [],
  }),

  toggleSeatSelection: (id) => {
    set((state) => {
      const isSelected = state.selectedSeatIds.includes(id);
      const newSelectedIds = isSelected
        ? state.selectedSeatIds.filter((seatId) => seatId !== id)
        : [...state.selectedSeatIds, id];
      
      return {
        selectedSeatIds: newSelectedIds,
        selectedSeatId: newSelectedIds.length === 1 ? newSelectedIds[0] : null,
      };
    });
  },

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
          label: '',
        });
      }
    }
    
    set({
      isPlacementMode: true,
      pendingSeats,
      gridRows: rows,
      gridCols: cols,
    });
  },

  cancelPlacementMode: () => set({
    isPlacementMode: false,
    pendingSeats: [],
    gridRows: 0,
    gridCols: 0,
  }),

  confirmPlacement: (centerX, centerY) => {
    const state = get();
    if (!state.isPlacementMode || state.pendingSeats.length === 0) {
      return;
    }

    const cols = state.gridCols;
    const rows = state.gridRows;
    const spacing = 35;
    
    const gridWidth = (cols - 1) * spacing;
    const gridHeight = (rows - 1) * spacing;
    const startX = centerX - gridWidth / 2;
    const startY = centerY - gridHeight / 2;

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

    set({
      seats: [...state.seats, ...newSeats],
      isPlacementMode: false,
      pendingSeats: [],
      gridRows: 0,
      gridCols: 0,
    });
    
    get().saveHistory();
  },
}));
