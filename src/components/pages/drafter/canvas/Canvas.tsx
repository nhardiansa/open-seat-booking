import { BottomBar } from "../toolbar/BottomBar"
import { Stage, Layer } from "react-konva"
import { useCanvas } from "@/hooks/drafter/useCanvas"
import { Seats } from "@/components/ui/custom/seats"

const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 700

export function Canvas() {

  const { handleStageClick } = useCanvas()

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
