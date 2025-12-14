export interface Event {
  id: string
  name: string
  venueName: string
  date: Date | null
  canvasWidth: number
  canvasHeight: number
  createdAt: number
  createdBy: string
}

export interface Category {
  id: string
  name: string
  color: string
  price: number
}

export interface VenueStore {
  event: Event | null
  categories: Category[]

  // Actions (signature only)
  setEvent: (event: Event) => void
  updateEvent: (updates: Partial<Event>) => void
  createNewEvent: () => void
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void
}
