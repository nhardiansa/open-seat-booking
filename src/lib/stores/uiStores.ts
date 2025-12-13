import { create } from 'zustand'

export interface UIStore {
  selectedTool: "select" | "add-single-seat" | "add-multiple-seats" | "add-landmark",
  selectedSeatIds: string[],

  // actions
  setSelectedTool: (tool: "select" | "add-single-seat" | "add-multiple-seats" | "add-landmark") => void,
}

export const useUIStore = create<UIStore>((set) => ({
  selectedTool: "select",
  selectedSeatIds: [],

  // actions
  setSelectedTool: (tool: "select" | "add-single-seat" | "add-multiple-seats" | "add-landmark") => set((state) => ({
    ...state,
    selectedTool: tool,
  })),
}))
