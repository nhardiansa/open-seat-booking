import { Button } from "@/components/ui/button";
import { Maximize, ZoomIn, ZoomOut } from "lucide-react";

export function BottomBar() {
  return (
    <div className="h-12 bg-card border-t border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ZoomOut className="h-4 w-4" />
        </Button>

        <div className="text-sm font-medium min-w-[60px] text-center">100%</div>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* <div className="text-sm text-muted-foreground">
          {selectedTool === "select" && "Select • Click & drag to select multiple objects"}
          {selectedTool === "pan" && "Pan • Click & drag to move around the canvas"}
          {selectedTool === "rectangle" && "Rectangle • Click & drag to create rectangles"}
          {selectedTool === "circle" && "Circle • Click & drag to create circles"}
          {selectedTool === "text" && "Text • Click to add text elements"}
          {selectedTool === "seating" && "Seating • Click to add seat elements"}
        </div> */}
    </div>
  )
}
