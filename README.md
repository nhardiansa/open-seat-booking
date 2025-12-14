# Open Seat Booking - MVP

Web-based seat booking system for events, where organizers can design venue layouts through an interactive canvas, and attendees can select seats in real time with a locking mechanism and multi-operator support—similar to seats.io, but fully integrated with an end-to-end booking flow.

## Prerequisites

- Node.js (v20+)
- pnpm (v10+)

## Installation

```bash
# Install dependencies
pnpm install
```

## Running the App

```bash
# Development mode
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview
```

## Environment Variables

Create `.env` file in root directory:

```env
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
VITE_USE_MOCK_API=true
VITE_USE_MOCK_SOCKET=true
```

## Routes

- `/` - Landing page
- `/organizer` - Create and edit venue layout
- `/operator/:eventId` - Operator/cashier view (loket)
- `/event/:eventId` - Customer booking view

## Features

### Organizer

- [ ] Manual add seat (1 click = 1 seat)
- [ ] Bulk add: Grid generator (rows × columns)
- [ ] Bulk add: Row generator (line of seats)
- [ ] Drag & reposition seats
- [ ] Edit seat properties (number, category, price)
- [ ] Delete seats (single & bulk)
- [ ] Auto-save to localStorage

### Customer/Operator

- [ ] View venue layout (mobile-first, responsive)
- [ ] Select seats with real-time locking
- [ ] Booking summary with countdown timer
- [ ] Checkout flow (mock payment)
- [ ] Multi-operator conflict prevention

### Real-time

- [ ] Seat locking (5 min duration)
- [ ] Auto-unlock on timeout
- [ ] Multi-operator support (3+ simultaneously)
- [ ] Visual indicators for locked seats
- [ ] Operator activity tracking

## Tech Stack

- React 19
- Konva.js (canvas rendering)
- Zustand (state management)
- React Router (routing)
- Vite (build tool)

## Known Limitations (MVP)

- Max 2000 seats per venue
- LocalStorage only (no backend yet)
- Mock real-time (no actual WebSocket server)
- Mock payment (no real transactions)

## Support

For issues or questions, contact: <nhardiansa25@gmail.com>
