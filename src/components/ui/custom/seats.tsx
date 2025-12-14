import { useSeatsStore } from "@/lib/stores/seatsStore"
import { Seat } from "./seat"

export const Seats = () => {
  const seatsStore = useSeatsStore()
  return (
    <>
      {
        seatsStore.seats.map((seat) => (
          <Seat
            key={seat.id}
            x={seat.position.x}
            y={seat.position.y}
            color="#f54f2a"
            isDraggable
          />
        ))
      }
    </>
  )
}
