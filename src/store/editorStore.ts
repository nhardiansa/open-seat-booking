import { create } from 'zustand';
import type { Seat, TicketCategory, Landmark } from '@/types/editor';

interface EditorStore {
  seats: Seat[];
  landmarks: Landmark[];
  selectedSeatId: string | null;
  selectedSeatIds: string[];
  selectedLandmarkId: string | null;
  selectedLandmarkIds: string[];
  categories: TicketCategory[];
  
  // Canvas settings
  canvasWidth: number;
  canvasHeight: number;
  
  // Zoom & Pan
  zoom: number;
  stagePosition: { x: number; y: number };
  isPanning: boolean;
  
  // Placement mode
  isPlacementMode: boolean;
  pendingSeats: Omit<Seat, 'id' | 'x' | 'y'>[];
  gridRows: number;
  gridCols: number;
  
  // History for undo/redo
  history: { seats: Seat[]; landmarks: Landmark[] }[];
  historyIndex: number;
  maxHistory: number;
  
  // Seat actions
  addSeat: (seat: Omit<Seat, 'id'>) => void;
  addBulkSeats: (seats: Omit<Seat, 'id'>[]) => void;
  updateSeat: (id: string, updates: Partial<Seat>) => void;
  deleteSeat: (id: string) => void;
  selectSeat: (id: string | null) => void;
  selectMultipleSeats: (ids: string[]) => void;
  clearSelection: () => void;
  toggleSeatSelection: (id: string) => void;
  
  // Landmark actions
  addLandmark: (landmark: Omit<Landmark, 'id'>) => void;
  updateLandmark: (id: string, updates: Partial<Landmark>) => void;
  deleteLandmark: (id: string) => void;
  selectLandmark: (id: string | null) => void;
  selectMultipleLandmarks: (ids: string[]) => void;
  
  // Canvas actions
  setCanvasSize: (width: number, height: number) => void;
  
  // Zoom & Pan actions
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setStagePosition: (pos: { x: number; y: number }) => void;
  setPanning: (isPanning: boolean) => void;
  
  // Alignment actions
  alignObjects: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  
  // Category actions
  addCategory: (category: TicketCategory) => void;
  
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
  landmarks: [],
  selectedSeatId: null,
  selectedSeatIds: [],
  selectedLandmarkId: null,
  selectedLandmarkIds: [],
  categories: [
    { id: '1', name: 'General Admission', color: '#ef4444', price: 100 },
    { id: '2', name: 'VIP', color: '#3b82f6', price: 250 },
    { id: '3', name: 'Regular', color: '#a3e635', price: 150 },
  ],
  
  // Canvas settings
  canvasWidth: 1000,
  canvasHeight: 700,
  
  // Zoom & Pan
  zoom: 1,
  stagePosition: { x: 0, y: 0 },
  isPanning: false,
  
  // Placement mode
  isPlacementMode: false,
  pendingSeats: [],
  gridRows: 0,
  gridCols: 0,
  
  // History state
  history: [{ seats: [], landmarks: [] }],
  historyIndex: 0,
  maxHistory: 50,

  // Save current state to history
  saveHistory: () => {
    set((state) => {
      const currentState = {
        seats: JSON.parse(JSON.stringify(state.seats)) as Seat[],
        landmarks: JSON.parse(JSON.stringify(state.landmarks)) as Landmark[],
      };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(currentState);
      
      if (newHistory.length > state.maxHistory) {
        newHistory.shift();
      }
      
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    const state = get();
    if (state.canUndo()) {
      const previous = state.history[state.historyIndex - 1];
      set({
        seats: JSON.parse(JSON.stringify(previous.seats)) as Seat[],
        landmarks: JSON.parse(JSON.stringify(previous.landmarks)) as Landmark[],
        historyIndex: state.historyIndex - 1,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.canRedo()) {
      const next = state.history[state.historyIndex + 1];
      set({
        seats: JSON.parse(JSON.stringify(next.seats)) as Seat[],
        landmarks: JSON.parse(JSON.stringify(next.landmarks)) as Landmark[],
        historyIndex: state.historyIndex + 1,
      });
    }
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  // Seat actions
  addSeat: (seat) => {
    set((state) => ({
      seats: [...state.seats, {
        ...seat,
        id: `seat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }],
    }));
    get().saveHistory();
  },

  addBulkSeats: (seats) => {
    set((state) => ({
      seats: [...state.seats, ...seats.map((seat, index) => ({
        ...seat,
        id: `seat-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      }))],
    }));
    get().saveHistory();
  },

  updateSeat: (id, updates) => {
    set((state) => ({
      seats: state.seats.map((seat) => seat.id === id ? { ...seat, ...updates } : seat),
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
    selectedLandmarkId: null,
    selectedLandmarkIds: [],
  }),

  selectMultipleSeats: (ids) => set({ 
    selectedSeatIds: ids,
    selectedSeatId: ids.length === 1 ? ids[0] : null,
    selectedLandmarkId: null,
    selectedLandmarkIds: [],
  }),

  clearSelection: () => set({ 
    selectedSeatId: null,
    selectedSeatIds: [],
    selectedLandmarkId: null,
    selectedLandmarkIds: [],
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

  // Landmark actions
  addLandmark: (landmark) => {
    set((state) => ({
      landmarks: [...state.landmarks, {
        ...landmark,
        id: `landmark-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }],
    }));
    get().saveHistory();
  },

  updateLandmark: (id, updates) => {
    set((state) => ({
      landmarks: state.landmarks.map((lm) => lm.id === id ? { ...lm, ...updates } : lm),
    }));
    get().saveHistory();
  },

  deleteLandmark: (id) => {
    set((state) => ({
      landmarks: state.landmarks.filter((lm) => lm.id !== id),
      selectedLandmarkId: state.selectedLandmarkId === id ? null : state.selectedLandmarkId,
      selectedLandmarkIds: state.selectedLandmarkIds.filter((lmId) => lmId !== id),
    }));
    get().saveHistory();
  },

  selectLandmark: (id) => set({ 
    selectedLandmarkId: id,
    selectedLandmarkIds: id ? [id] : [],
    selectedSeatId: null,
    selectedSeatIds: [],
  }),

  selectMultipleLandmarks: (ids) => set({ 
    selectedLandmarkIds: ids,
    selectedLandmarkId: ids.length === 1 ? ids[0] : null,
    selectedSeatId: null,
    selectedSeatIds: [],
  }),

  // Canvas actions
  setCanvasSize: (width, height) => set({ canvasWidth: width, canvasHeight: height }),

  // Zoom & Pan actions
  setZoom: (zoom) => set({ zoom: Math.min(3, Math.max(0.1, zoom)) }),
  zoomIn: () => set((state) => ({ zoom: Math.min(3, state.zoom + 0.1) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(0.1, state.zoom - 0.1) })),
  setStagePosition: (pos) => set({ stagePosition: pos }),
  setPanning: (isPanning) => set({ isPanning }),

  // Alignment actions
  alignObjects: (direction) => {
    const state = get();
    const { selectedSeatIds, seats, canvasWidth, canvasHeight } = state;
    
    if (selectedSeatIds.length === 0) return;
    
    const selectedSeats = seats.filter(s => selectedSeatIds.includes(s.id));
    
    if (selectedSeatIds.length === 1) {
      // Align to canvas
      const seat = selectedSeats[0];
      let updates: Partial<Seat> = {};
      
      switch (direction) {
        case 'left': updates.x = seat.radius; break;
        case 'center': updates.x = canvasWidth / 2; break;
        case 'right': updates.x = canvasWidth - seat.radius; break;
        case 'top': updates.y = seat.radius; break;
        case 'middle': updates.y = canvasHeight / 2; break;
        case 'bottom': updates.y = canvasHeight - seat.radius; break;
      }
      
      set((st) => ({
        seats: st.seats.map(s => s.id === seat.id ? { ...s, ...updates } : s),
      }));
    } else {
      // Align to selection bounds
      const minX = Math.min(...selectedSeats.map(s => s.x));
      const maxX = Math.max(...selectedSeats.map(s => s.x));
      const minY = Math.min(...selectedSeats.map(s => s.y));
      const maxY = Math.max(...selectedSeats.map(s => s.y));
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      
      set((st) => ({
        seats: st.seats.map(s => {
          if (!selectedSeatIds.includes(s.id)) return s;
          let updated = { ...s };
          
          switch (direction) {
            case 'left': updated.x = minX; break;
            case 'center': updated.x = centerX; break;
            case 'right': updated.x = maxX; break;
            case 'top': updated.y = minY; break;
            case 'middle': updated.y = centerY; break;
            case 'bottom': updated.y = maxY; break;
          }
          return updated;
        }),
      }));
    }
    
    get().saveHistory();
  },

  // Category actions
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, category],
  })),

  // Placement mode actions
  startPlacementMode: (rows, cols) => {
    const pendingSeats: Omit<Seat, 'id' | 'x' | 'y'>[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pendingSeats.push({ radius: 15, color: '#ef4444', label: '' });
      }
    }
    set({ isPlacementMode: true, pendingSeats, gridRows: rows, gridCols: cols });
  },

  cancelPlacementMode: () => set({
    isPlacementMode: false, pendingSeats: [], gridRows: 0, gridCols: 0,
  }),

  confirmPlacement: (centerX, centerY) => {
    const state = get();
    if (!state.isPlacementMode || state.pendingSeats.length === 0) return;

    const { gridCols: cols, gridRows: rows } = state;
    const spacing = 35;
    const gridWidth = (cols - 1) * spacing;
    const gridHeight = (rows - 1) * spacing;
    const startX = centerX - gridWidth / 2;
    const startY = centerY - gridHeight / 2;

    const newSeats = state.pendingSeats.map((seat, index) => ({
      ...seat,
      id: `seat-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      x: startX + (index % cols) * spacing,
      y: startY + Math.floor(index / cols) * spacing,
    }));

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
