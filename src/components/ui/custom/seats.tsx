import { Seat, type SeatProps } from "./seat"

interface SeatsProps {
  seats: SeatProps[]
}

export const Seats = ({ seats }: SeatsProps) => {
  return (
    <>
      {
        seats.map((seat, index) => {
          return (
            <Seat
              key={index}
              x={seat.x}
              y={seat.y}
              color="#F6B4B8"
              strokeColor={"#E03838"}
              fontSize={11}
              isDraggable={seat.isDraggable || true}
              seatNumber={seat.seatNumber}
            />
          )
        })
      }
    </>
  )
}
