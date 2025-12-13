import { useUIStore, type UIStore } from "@/lib/stores/uiStores"
import { useEffect } from "react"

export const useToolSideBar = () => {

  const { setSelectedTool, selectedTool } = useUIStore()

  const handleToolSelect = (tool: UIStore['selectedTool']) => {
    setSelectedTool(tool)
  }

  useEffect(() => {
    if (selectedTool === "add-single-seat") {
      document.body.style.cursor = "crosshair"
    } else {
      document.body.style.cursor = "default"
    }
  }, [selectedTool])

  return {
    selectedTool,
    handleToolSelect,
  }
}
