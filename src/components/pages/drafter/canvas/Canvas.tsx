import { Seat } from "@/components/ui/custom/seat"
import { BottomBar } from "../toolbar/BottomBar"
import { Stage, Layer } from "react-konva"
import Konva from "konva"
import { useUIStore } from "@/lib/stores/uiStores"
import { useSeatsStore } from "@/lib/stores/venue/event"
import { useEffect } from "react"

// interface CanvasProps {
//   selectedTool: string
// }

const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 700
const SEATS_LIMIT = 2000

export function Canvas() {

  const uiStore = useUIStore()
  const seatsStore = useSeatsStore()

  const onStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {

    // Cek apakah klik di empty space (bukan di seat)
    if (e.target === e.target.getStage()) {

      const toolMode = uiStore.selectedTool

      if (toolMode === "add-single-seat") {

        const stage = e.target.getStage()
        const position = stage.getPointerPosition()

        if (!position) {
          alert("Failed to get position")
          return
        }

        handleAddSingleSeat({
          x: position.x,
          y: position.y,
        })
      }
    }
  }

  const handleAddSingleSeat = (position: { x: number, y: number }) => {
    const x = position.x
    const y = position.y

    if (seatsStore.seats.length >= SEATS_LIMIT) {
      alert("Seat limit reached")
      return
    }

    // 
    seatsStore.addSeat({
      id: (seatsStore.seats.length + 1).toString(),
      position: {
        x,
        y,
      },
      categoryId: "VIP",
      seatLabel: "VIP",
      status: "available",
      rotation: 0,
    })
  }

  useEffect(() => {
    // console.log(seatsStore.seats)
  }, [seatsStore.seats])

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
              onClick={(e) => onStageClick(e)}
            >
              <Layer>
                <Seats />
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

const Seats = () => {
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
