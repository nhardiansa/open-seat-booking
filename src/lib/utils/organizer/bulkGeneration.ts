import type { Seat } from "@/lib/stores/seatsStore"
import type { GridConfig } from "@/lib/stores/uiStores"
import { createSeatObject } from "./seatFactory"

interface Canvas {
  width: number
  height: number
}

interface GenerationResult {
  seats: Seat[]
  skipped: number
  warnings: string[]
}

export function generateGrid(
  config: GridConfig,
  canvas: Canvas,
  existingSeats?: Seat[]
): GenerationResult {
  const { rows, columns, spacingX, spacingY, startX, startY, startRow, startNum } = config

  const seats: Seat[] = []
  const warnings: string[] = []
  const skipped = 0

  for (let row = 0; row < rows; row++) {
    // Calculate row letter (A, B, C, ...)
    const rowIndex = startRow.charCodeAt(0) - 65 + row // 'A' = 65
    const rowLetter = String.fromCharCode(65 + rowIndex)

    for (let col = 0; col < columns; col++) {
      const x = startX + (col * spacingX)
      const y = startY + (row * spacingY)
      const seatNumber = `${rowLetter}${startNum + col}`

      // Create seat
      const seat = createSeatObject(
        { x, y },
        seatNumber,
        { category: "regular" }
      )

      seats.push(seat)
    }
  }

  return {
    seats,
    skipped,
    warnings,
  }
}
