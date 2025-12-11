export interface Seat {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  label: string;
  category?: string;
}

export interface TicketCategory {
  id: string;
  name: string;
  color: string;
  price: number;
}

export interface EditorState {
  seats: Seat[];
  selectedSeatId: string | null;
  categories: TicketCategory[];
  canvasWidth: number;
  canvasHeight: number;
}
