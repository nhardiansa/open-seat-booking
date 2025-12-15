import { BottomBar } from "../toolbar/BottomBar"
import { Stage, Layer } from "react-konva"
import { useCanvas } from "@/hooks/drafter/useCanvas"
import { Seats } from "@/components/ui/custom/seats"
import { PreviewSeats } from "@/components/ui/custom/preview-seats"
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/lib/constants"

export function Canvas() {

  const { handleStageClick, seats, handleMouseMove, previewSeats, isPreviewValid, outOfBoundsSeats } = useCanvas()

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Canvas Area */}
      <div className="flex-1">
        <div
          className="w-full h-full bg-gray-400 flex items-center justify-center"
        >
          <div
            className="stage-wrapper bg-background"
            style={{
              backgroundImage: `
              radial-gradient(circle, #e5e7eb 1px, transparent 1px)
            `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0",
            }}>
            <Stage
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onClick={handleStageClick}
              onMouseMove={handleMouseMove}
            >
              <Layer>
                <Seats seats={seats.map(seat => ({
                  x: seat.position.x,
                  y: seat.position.y,
                  color: "",
                  fontSize: 0,
                  isDraggable: true,
                  seatNumber: seat.displaySeatNumber,
                  strokeColor: "",
                }))} />

                <PreviewSeats seats={previewSeats} isValid={isPreviewValid} outOfBoundsSeats={outOfBoundsSeats} />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <BottomBar />
    </div>
  )
}
