import type { Seat } from "./stores/seatsStore";
import type { Category } from "./stores/venueStore";

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface Bounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export interface SavedLayout {
    eventId: string;
    venue: Event;
    seats: Seat[];
    categories: Category[];
    lastModified: number;
    version: string;
}

export interface EventListItem {
    id: string;
    name: string;
    venueName: string;
    lastModified: number;
    seatsCount: number;
}
