export interface Seat {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  label: string;
  category?: string;
}

export interface Landmark {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
  category?: string;
  label: string;
  labelColor: string;
  labelSize: number;
}

export interface TicketCategory {
  id: string;
  name: string;
  color: string;
  price: number;
}

export interface EditorState {
  seats: Seat[];
  landmarks: Landmark[];
  selectedSeatId: string | null;
  selectedLandmarkId: string | null;
  categories: TicketCategory[];
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  stagePosition: { x: number; y: number };
}
