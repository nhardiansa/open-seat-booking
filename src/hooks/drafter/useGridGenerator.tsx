import { MAX_SEATS } from "@/lib/constants"
import { useSeatsStore } from "@/lib/stores/seatsStore"
import { useUIStore } from "@/lib/stores/uiStores"
import { useEffect, useState } from "react"

export interface GridConfig {
  rows: number
  columns: number
  spacingX: number
  spacingY: number
  category: "VIP" | "Regular" | "Economy"
  startingRowLetter: string
  startingNumber: number
}

export function useGridGenerator() {
  const { toolMode, setToolMode, setGridConfig } = useUIStore()
  const { seats } = useSeatsStore()

  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<GridConfig>({
    rows: 10,
    columns: 10,
    spacingX: 16,
    spacingY: 16,
    category: "Regular",
    startingRowLetter: "A",
    startingNumber: 1,
  })

  const [totalSeats] = useState(() => config.rows * config.columns)
  const [totalSeatsWithExisting] = useState(() => totalSeats + seats.length)
  const [existingSeats] = useState(() => MAX_SEATS - seats.length)
  const [exceedsLimit] = useState(() => totalSeatsWithExisting > MAX_SEATS)

  const updateConfig = (key: keyof GridConfig, value: GridConfig[keyof GridConfig]) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  // Generate handler
  const handleGenerate = () => {
    setToolMode("grid-placement")
    setOpen(false)

    setGridConfig({
      rows: config.rows,
      columns: config.columns,
      spacingX: config.spacingX,
      spacingY: config.spacingY,
      startNum: config.startingNumber,
      startRow: config.startingRowLetter,
      startX: 0,
      startY: 0,
    })

    console.log(config)
  }

  const handleOpenModal = () => {
    console.log("open modal")
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
    setToolMode("select")
  }

  useEffect(() => {
    if (toolMode === "add-multiple-seats") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true)
    }
  }, [toolMode])

  return {
    open,
    handleOpenModal,
    handleCloseModal,
    config,
    updateConfig,
    totalSeats,
    exceedsLimit,
    handleGenerate,
    MAX_SEATS,
    existingSeats,
    totalSeatsWithExisting
  }
}
