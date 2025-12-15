import { useUIStore, type ToolMode } from "@/lib/stores/uiStores"
import { useEffect } from "react"

export const useToolSideBar = () => {

  const { toolMode, setToolMode } = useUIStore()

  const handleToolSelect = (tool: ToolMode) => {
    setToolMode(tool)
  }

  useEffect(() => {
    if (toolMode === "add-single-seat") {
      document.body.style.cursor = "crosshair"
      return
    }

    if (toolMode === "grid-placement") {
      document.body.style.cursor = "crosshair"
      return
    }

    document.body.style.cursor = "default"
  }, [toolMode])

  return {
    toolMode,
    handleToolSelect,
  }
}
