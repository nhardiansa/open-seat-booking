import { useUIStore } from "@/lib/stores/uiStores"
import { useSeatsStore } from "@/lib/stores/venue/event"
import type Konva from "konva"
import { useEffect } from "react"

const SEATS_LIMIT = 2000


export const useCanvas = () => {
  const uiStore = useUIStore()
  const seatsStore = useSeatsStore()

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {

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

  return {
    handleStageClick,
  }

}
