import { Button } from "@/components/ui/button"
import { Check, Search, Settings } from "lucide-react"

export function PropertiesSidebar() {
  return (
    <aside className="w-80 bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Small theatre with GA chart</h2>
      </div>

      {/* Properties Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Categories Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-background" />
              </div>
              <span className="text-sm text-foreground">3 categories</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Manage
            </Button>
          </div>
        </div>

        {/* Places Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-background" />
              </div>
              <span className="text-sm text-foreground">699 places</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Validation Checks */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span className="text-sm text-success">No duplicate objects</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span className="text-sm text-success">All objects are labeled</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span className="text-sm text-success">All objects are categorized</span>
          </div>
        </div>

        {/* Multiple Object Types */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">1 categories on multiple object types</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Focal Point */}
        <div className="flex items-center gap-2 pt-2">
          <Check className="h-4 w-4 text-success" />
          <span className="text-sm text-success">Focal point is set</span>
        </div>
      </div>
    </aside>
  )
}
