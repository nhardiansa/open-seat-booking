import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MousePointer,
  Square,
  Circle,
  type LucideProps,
  Grid3x2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToolSideBar } from "@/hooks/drafter/useToolSideBar"
import type { ToolMode } from "@/lib/stores/uiStores"

interface ToolGroups {
  name: string,
  tools: {
    id: ToolMode,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    label: string,
  }[]
}

const toolGroups: ToolGroups[] = [
  {
    name: "Selection",
    tools: [
      { id: "select", icon: MousePointer, label: "Select" },
    ],
  },
  {
    name: "Shapes",
    tools: [
      { id: "add-landmark", icon: Square, label: "Add Landmark" },
      { id: "add-single-seat", icon: Circle, label: "Add Single Seat" },
      { id: "add-multiple-seats", icon: Grid3x2, label: "Add Multiple Seats" },
    ],
  },
  // {
  //   name: "Content",
  //   tools: [
  //     { id: "text", icon: Type, label: "Text" },
  //     { id: "image", icon: ImageIcon, label: "Image" },
  //     { id: "seating", icon: Users, label: "Seating" },
  //   ],
  // },
  // {
  //   name: "Transform",
  //   tools: [
  //     { id: "move", icon: Move, label: "Move" },
  //     { id: "rotate", icon: RotateCcw, label: "Rotate" },
  //     { id: "copy", icon: Copy, label: "Copy" },
  //     { id: "delete", icon: Trash2, label: "Delete" },
  //   ],
  // },
  // {
  //   name: "View",
  //   tools: [
  //     { id: "layers", icon: Layers, label: "Layers" },
  //     { id: "colors", icon: Palette, label: "Colors" },
  //     { id: "grid", icon: Grid3X3, label: "Grid" },
  //     { id: "ruler", icon: Ruler, label: "Ruler" },
  //   ],
  // },
]

export function ToolSideBar() {
  const { toolMode, handleToolSelect } = useToolSideBar()

  return (
    <aside className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col top-0 bottom-0">
      <div className="flex-1 py-4">
        {toolGroups.map((group, groupIndex) => (
          <div key={group.name} className="mb-4">
            {toolGroups.map((_, index) => index < groupIndex && <Separator key={index} className="mb-4" />)}

            <div className="space-y-1 px-2">
              {group.tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={toolMode === tool.id ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-10 h-10 p-0 flex flex-col items-center justify-center",
                    toolMode === tool.id
                      ? "bg-sidebar-primary-foreground text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => handleToolSelect(tool.id)}
                  title={tool.label}
                >
                  <tool.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
