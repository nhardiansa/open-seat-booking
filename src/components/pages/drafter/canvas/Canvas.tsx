import { Seat } from "@/components/ui/custom/seat"
import { BottomBar } from "../toolbar/BottomBar"
import { Stage, Layer, Circle, Group } from "react-konva"

// interface CanvasProps {
//   selectedTool: string
// }

export function Canvas() {
  // const [zoom, setZoom] = useState(100)
  // const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="w-full h-full bg-background relative"
          style={{
            backgroundImage: `
              radial-gradient(circle, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0",
          }}
        >
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
          >
            <Layer>
              <Group draggable>
                <Seat x={20} y={50} color="red" isDraggable />
                <Circle
                  x={200}
                  y={100}
                  radius={50}
                  fill="green"
                  draggable
                />
              </Group>
            </Layer>
          </Stage>
        </div>
      </div>

      {/* Bottom Controls */}
      <BottomBar />
    </div>
  )
}
