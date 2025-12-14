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
            color="#F6B4B8"
            storeColor={"#E03838"}
            fontSize={11}
            isDraggable={seat.isDraggable || true}
            seatNumber={seat.displaySeatNumber}
          />
        ))
      }
    </>
  )
}
