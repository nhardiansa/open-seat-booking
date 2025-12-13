import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"

interface CanvasProps {
  selectedTool: string
}

export function Canvas({ selectedTool }: CanvasProps) {
  const [zoom, setZoom] = useState(100)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 400))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25))
  const handleFitToScreen = () => setZoom(100)

  return (
    <div className="h-full flex flex-col bg-muted/20">
      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          className="w-full h-full bg-background relative"
          style={{
            backgroundImage: `
              radial-gradient(circle, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0",
          }}
        >
          {/* Sample Theater Layout */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" style={{ transform: `scale(${zoom / 100})` }}>
              {/* Stage */}
              <div className="text-center mb-8">
                <div className="text-2xl font-bold text-muted-foreground tracking-[0.5em]">STAGE</div>
                <div className="w-96 h-2 bg-primary rounded-full mt-2"></div>
              </div>

              {/* Seating Sections */}
              <div className="flex gap-8 items-center">
                {/* Left Section */}
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div
                      key={`left-${i}`}
                      className="w-3 h-3 rounded-full bg-chart-4 hover:bg-chart-4/80 cursor-pointer transition-colors"
                    />
                  ))}
                </div>

                {/* Center Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded text-sm font-medium">
                    General Admission
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div
                        key={`center-${i}`}
                        className="w-3 h-3 rounded-full bg-destructive hover:bg-destructive/80 cursor-pointer transition-colors"
                      />
                    ))}
                  </div>
                  {/* Accessibility symbols */}
                  <div className="flex gap-4 mt-2">
                    <div className="text-chart-3 text-lg">♿</div>
                    <div className="text-chart-3 text-lg">♿</div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div
                      key={`right-${i}`}
                      className="w-3 h-3 rounded-full bg-chart-4 hover:bg-chart-4/80 cursor-pointer transition-colors"
                    />
                  ))}
                </div>
              </div>

              {/* Orchestra Section */}
              <div className="mt-8 text-center">
                <div className="grid grid-cols-10 gap-1 justify-center">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={`orchestra-${i}`}
                      className="w-3 h-3 rounded-full bg-chart-4 hover:bg-chart-4/80 cursor-pointer transition-colors"
                    />
                  ))}
                </div>
                <div className="text-lg font-medium text-muted-foreground mt-4">ORCHESTRA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="h-12 bg-card border-t border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>

          <div className="text-sm font-medium min-w-[60px] text-center">{zoom}%</div>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleFitToScreen}>
            <Maximize className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {selectedTool === "select" && "Select • Click & drag to select multiple objects"}
          {selectedTool === "pan" && "Pan • Click & drag to move around the canvas"}
          {selectedTool === "rectangle" && "Rectangle • Click & drag to create rectangles"}
          {selectedTool === "circle" && "Circle • Click & drag to create circles"}
          {selectedTool === "text" && "Text • Click to add text elements"}
          {selectedTool === "seating" && "Seating • Click to add seat elements"}
        </div>
      </div>
    </div>
  )
}
