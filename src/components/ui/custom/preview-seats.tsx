import type { Seat as SeatType } from "@/lib/stores/seatsStore"
import { Seat } from "./seat"

interface SeatsProps {
  seats: SeatType[]
  isValid: boolean
  outOfBoundsSeats: string[]
}

export const PreviewSeats = ({ seats, isValid, outOfBoundsSeats }: SeatsProps) => {
  return (
    <>
      {
        seats.map((seat, index) => {

          const isOutOfBounds = outOfBoundsSeats.includes(seat.id)

          // Determine visual state
          const fill = isOutOfBounds
            ? '#EF4444' // Red for out of bounds
            : "#F6B4B8"

          const opacity = isOutOfBounds ? 0.3 : 0.5

          const stroke = isOutOfBounds
            ? '#DC2626' // Dark red
            : isValid
              ? '#10B981' // Green if all valid
              : '#F59E0B' // Yellow if some invalid

          return (
            <Seat
              key={index}
              x={seat.position.x}
              y={seat.position.y}
              color={fill}
              strokeColor={stroke}
              fontSize={11}
              opacity={opacity}
              isDraggable={seat.isDraggable || true}
              seatNumber={seat.seatNumber}
            />
          )
        })
      }
    </>
  )
}
