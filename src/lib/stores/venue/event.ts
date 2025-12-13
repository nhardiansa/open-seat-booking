import { create } from 'zustand'


/*=============== Venue Store =============== */
interface VenueStore {
  id: string,
  name: string,
  venueName: string,
  canvasWidth: number,
  canvasHeight: number,
  createdBy: string,
  createdAt: string,
  updatedAt: string,
  // actions
  setVenue: (venue: VenueStore) => void, // set venue
  updateVenueProperty: (venue: VenueStore) => void, // update venue property
}

export const useVenueStore = create<VenueStore>((set) => ({
  id: "",
  name: "",
  venueName: "",
  canvasWidth: 0,
  canvasHeight: 0,
  createdBy: "",
  createdAt: "",
  updatedAt: "",
  setVenue: (venue: VenueStore) => set(venue),
  updateVenueProperty: (venue: VenueStore) => set((state) => ({
    ...state,
    ...venue,
  })),
}))



/*=============== Seats Store =============== */
interface Seat {
  id: string,
  x: number,           // posisi X di canvas
  y: number,           // posisi Y di canvas
  width: number,        // lebar kursi
  height: number,       // tinggi kursi
  seatNumber: string, // nomor kursi
  categoryId: string,  // kategori
  status: "available" | "selected" | "booked", // available | selected | booked
  rotation: number       // untuk rotasi kursi (opsional)
}

interface SeatsStore {
  seats: Seat[]

  // actions
  addSeat: (seat: Seat) => void,
  deleteSeat: (seatId: string) => void,
  updateSeat: (seat: Seat) => void,
  bulkUpdateSeats: (seats: Seat[]) => void,
  loadSeats: (seats: Seat[]) => void,
}

export const useSeatsStore = create<SeatsStore>((set) => ({
  seats: [],

  // actions
  addSeat: (seat: Seat) => set((state) => ({
    ...state,
    seats: [...state.seats, seat],
  })),
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
}))


// =============== Booking Store =============== 
// interface BookingStore {
//   selectedSeatIds: string[],
//   customerInfo: { name: string, email: string },

//   // actions
//   setSelectedSeatIds: (selectedSeatIds: string[]) => void,
//   setCustomerInfo: (customerInfo: { name: string, email: string }) => void,
// }

// export const useBookingStore = create<BookingStore>((set) => ({
//   selectedSeatIds: [],
//   customerInfo: { name: "", email: "" },

//   // actions
//   setSelectedSeatIds: (selectedSeatIds: string[]) => set((state) => ({
//     ...state,
//     selectedSeatIds: selectedSeatIds,
//   })),
//   setCustomerInfo: (customerInfo: { name: string, email: string }) => set((state) => ({
//     ...state,
//     customerInfo: customerInfo,
//   })),
// }))
