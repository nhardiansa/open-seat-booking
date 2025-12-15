/* eslint-disable react-hooks/exhaustive-deps */

import { CANVAS_HEIGHT, CANVAS_WIDTH, MAX_SEATS, SEAT_RADIUS } from "@/lib/constants"
import { useSeatsStore, type Seat } from "@/lib/stores/seatsStore"
import { useUIStore } from "@/lib/stores/uiStores"
import { throttle } from "@/lib/utils"
import { generateGrid } from "@/lib/utils/organizer/bulkGeneration"
import type Konva from "konva"
import type { KonvaEventObject } from "konva/lib/Node"
import { useEffect, useMemo, useState } from "react"

const SEATS_LIMIT = 2000


export const useCanvas = () => {
  const uiStore = useUIStore()
  const seatsStore = useSeatsStore()

  const gridConfig = uiStore.gridConfig
  const seats = seatsStore.seats

  // create temp preview add bulk seats before bulk seats are added
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [previewSeats, setPreviewSeats] = useState<Seat[]>([])
  const [isPreviewValid, setIsPreviewValid] = useState(true)
  const [outOfBoundsSeats, setOutOfBoundsSeats] = useState<string[]>([])

  // handle mouse move
  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage()

    if (!stage) return
    const pointer = stage.getPointerPosition()
    if (!pointer) return

    setMousePosition({ x: pointer.x, y: pointer.y })
  }

  const throttledMouseMove = useMemo(
    () => throttle(handleMouseMove, 100), // Update every 100ms
    [uiStore.toolMode]
  )

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {

    // Cek apakah klik di empty space (bukan di seat)
    if (e.target === e.target.getStage()) {

      const toolMode = uiStore.toolMode

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

        return
      }

      if (toolMode === "grid-placement") {
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

    const seatCategory = "VIP"
    // 
    seatsStore.addSeat({
      id: (seatsStore.seats.length + 1).toString(),
      position: {
        x,
        y,
      },
      categoryId: seatCategory,
      seatNumber: `${seatCategory}-${seatsStore.seats.length + 1}`,
      displaySeatNumber: `${seatsStore.seats.length + 1}`,
      status: "available",
      isManualNumber: false,
      realtimeStatus: {
        isLocked: false,
        lockedBy: null,
        lockedByName: null,
        lockedAt: null,
        expiresAt: null,
        isPendingPayment: false,
      },
    })
  }

  // const handleAddBulkSeats = () => {

  // }

  // Generate preview grid based on mouse position
  const handleGeneratePreviewGrid = () => {
    if (uiStore.toolMode !== 'grid-placement' || !mousePosition || !gridConfig) {
      setPreviewSeats([])
      return
    }

    // Calculate grid dimensions
    const gridWidth = (gridConfig.columns - 1) * gridConfig.spacingX
    const gridHeight = (gridConfig.rows - 1) * gridConfig.spacingY

    // Calculate start position (center anchor)
    const startX = mousePosition.x - (gridWidth / 2)
    const startY = mousePosition.y - (gridHeight / 2)

    // Create temp config with mouse position
    const tempConfig = {
      ...gridConfig,
      startX,
      startY,
    }

    // Generate preview grid
    const result = generateGrid(tempConfig, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    }, seats)

    setPreviewSeats(result.seats)

    // Validate boundaries
    const outOfBounds: string[] = []
    let allValid = true

    result.seats.forEach(seat => {
      const isOutLeft = seat.position.x - SEAT_RADIUS < 0
      const isOutRight = seat.position.x + SEAT_RADIUS > CANVAS_WIDTH
      const isOutTop = seat.position.y - SEAT_RADIUS < 0
      const isOutBottom = seat.position.y + SEAT_RADIUS > CANVAS_HEIGHT

      if (isOutLeft || isOutRight || isOutTop || isOutBottom) {
        outOfBounds.push(seat.id)
        allValid = false
      }
    })

    // Check seat limit
    const totalSeats = seats.length + result.seats.length
    if (totalSeats > MAX_SEATS) {
      allValid = false
    }

    setOutOfBoundsSeats(outOfBounds)
    setIsPreviewValid(allValid)
  }

  useEffect(() => {
    handleGeneratePreviewGrid()
  }, [mousePosition])

  // Handle Escape key to cancel
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && uiStore.toolMode === 'grid-placement') {
      uiStore.setToolMode('select')
      setPreviewSeats([])
      setMousePosition({ x: 0, y: 0 })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [uiStore.toolMode])

  return {
    handleStageClick,
    seats: seatsStore.seats,
    handleMouseMove: throttledMouseMove,
    previewSeats,
    isPreviewValid,
    outOfBoundsSeats,
  }

}
