import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MousePointer,
  Square,
  Circle,
  Shapes,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolSidebarProps {
  selectedTool: string
  onToolSelect: (tool: string) => void
}

const toolGroups = [
  {
    name: "Selection",
    tools: [
      { id: "select", icon: MousePointer, label: "Select" },
    ],
  },
  {
    name: "Shapes",
    tools: [
      { id: "rectangle", icon: Square, label: "Rectangle" },
      { id: "circle", icon: Circle, label: "Circle" },
      { id: "shapes", icon: Shapes, label: "Shapes" },
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

export function ToolSidebar({ selectedTool, onToolSelect }: ToolSidebarProps) {
  return (
    <aside className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="flex-1 py-4">
        {toolGroups.map((group, groupIndex) => (
          <div key={group.name} className="mb-4">
            {toolGroups.map((_, index) => index < groupIndex && <Separator key={index} className="mb-4" />)}

            <div className="space-y-1 px-2">
              {group.tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-10 h-10 p-0 flex flex-col items-center justify-center",
                    selectedTool === tool.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => onToolSelect(tool.id)}
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
