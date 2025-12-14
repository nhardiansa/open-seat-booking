import { create } from 'zustand'

export type ToolMode = "select" | "add-single-seat" | "add-multiple-seats" | "add-landmark"

interface GridConfig {
  rows: number
  columns: number
  spacingX: number
  spacingY: number
  startX: number
  startY: number
  startRow: string
  startNum: number
}

interface RowConfig {
  startPoint: { x: number; y: number } | null
  endPoint: { x: number; y: number } | null
  numberOfSeats: number
  rowLetter: string
  startNum: number
}

interface Notification {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

interface UIStore {
  toolMode: ToolMode
  selectedSeatIds: string[]
  gridConfig: GridConfig
  rowConfig: RowConfig
  isPropertiesPanelOpen: boolean
  notification: Notification | null

  // Actions (signature only)
  setToolMode: (mode: ToolMode) => void
  setSelectedSeats: (ids: string[]) => void
  toggleSeatSelection: (id: string) => void
  clearSelection: () => void
  setGridConfig: (config: Partial<GridConfig>) => void
  setRowConfig: (config: Partial<RowConfig>) => void
  togglePropertiesPanel: () => void
  showNotification: (notification: Notification) => void
  clearNotification: () => void
}

// export interface UIStore {
//   selectedTool: "select" | "add-single-seat" | "add-multiple-seats" | "add-landmark",
//   selectedSeatIds: string[],

//   // actions
//   setSelectedTool: (tool: "select" | "add-single-seat" | "add-multiple-seats" | "add-landmark") => void,
// }

export const useUIStore = create<UIStore>((set) => ({
  toolMode: "select",
  selectedSeatIds: [],
  gridConfig: {
    rows: 0,
    columns: 0,
    spacingX: 0,
    spacingY: 0,
    startX: 0,
    startY: 0,
    startRow: "",
    startNum: 0,
  },
  rowConfig: {
    startPoint: null,
    endPoint: null,
    numberOfSeats: 0,
    rowLetter: "",
    startNum: 0,
  },
  isPropertiesPanelOpen: false,
  notification: null,

  // Actions (signature only)
  setToolMode: (mode: ToolMode) => set((state) => ({
    ...state,
    toolMode: mode,
  })),
  setSelectedSeats: (ids: string[]) => set((state) => ({
    ...state,
    selectedSeatIds: ids,
  })),
  toggleSeatSelection: (id: string) => set((state) => ({
    ...state,
    selectedSeatIds: state.selectedSeatIds.includes(id)
      ? state.selectedSeatIds.filter((seatId) => seatId !== id)
      : [...state.selectedSeatIds, id],
  })),
  clearSelection: () => set((state) => ({
    ...state,
    selectedSeatIds: [],
  })),
  setGridConfig: (config: Partial<GridConfig>) => set((state) => ({
    ...state,
    gridConfig: {
      ...state.gridConfig,
      ...config,
    },
  })),
  setRowConfig: (config: Partial<RowConfig>) => set((state) => ({
    ...state,
    rowConfig: {
      ...state.rowConfig,
      ...config,
    },
  })),
  togglePropertiesPanel: () => set((state) => ({
    ...state,
    isPropertiesPanelOpen: !state.isPropertiesPanelOpen,
  })),
  showNotification: (notification: Notification) => set((state) => ({
    ...state,
    notification: notification,
  })),
  clearNotification: () => set((state) => ({
    ...state,
    notification: null,
  })),
}))
