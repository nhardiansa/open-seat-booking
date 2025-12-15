import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useGridGenerator } from "@/hooks/drafter/useGridGenerator"

export function GridGeneratorDialog() {

  const {
    config,
    updateConfig,
    open,
    handleCloseModal,
    exceedsLimit,
    totalSeats,
    totalSeatsWithExisting,
    handleGenerate,
    existingSeats
  } = useGridGenerator()

  return (
    <Dialog open={open} onOpenChange={() => { }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Seating Grid</DialogTitle>
          <DialogDescription>Configure the seating grid layout and positioning</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Grid Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Grid Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rows">Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  min="1"
                  value={config.rows}
                  onChange={(e) => updateConfig("rows", Number.parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="columns">Columns</Label>
                <Input
                  id="columns"
                  type="number"
                  min="1"
                  value={config.columns}
                  onChange={(e) => updateConfig("columns", Number.parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Category and Labeling */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Seat Configuration</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={config.category} onValueChange={(value) => updateConfig("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Economy">Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="starting-row-letter">Starting Row Letter</Label>
                  <Input
                    id="starting-row-letter"
                    type="text"
                    maxLength={1}
                    value={config.startingRowLetter}
                    onChange={(e) => updateConfig("startingRowLetter", e.target.value.toUpperCase() || "A")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="starting-number">Starting Number</Label>
                  <Input
                    id="starting-number"
                    type="number"
                    min="1"
                    value={config.startingNumber}
                    onChange={(e) => updateConfig("startingNumber", Number.parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Summary Section */}
          <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
            <h3 className="text-sm font-semibold">Summary</h3>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-success mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium">Total seats to create:</span>{" "}
                  <span className="font-bold">{totalSeats.toLocaleString()}</span> ({config.rows} rows ×{" "}
                  {config.columns} columns)
                </div>
              </div>

              {existingSeats > 0 && (
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">Existing seats: {existingSeats.toLocaleString()}</div>
                </div>
              )}

              {exceedsLimit && (
                <div className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-medium">Warning:</span> Total seats ({totalSeatsWithExisting.toLocaleString()}
                    ) exceeds the maximum limit of 2,000
                  </div>
                </div>
              )}

              {/* {exceedsCanvas && (
                <div className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-medium">Warning:</span> Grid extends beyond canvas boundaries ({CANVAS_WIDTH}×
                    {CANVAS_HEIGHT}px)
                  </div>
                </div>
              )} */}

              <div className="flex items-start gap-2 text-muted-foreground">
                <Check className="h-4 w-4 mt-0.5" />
                <div className="text-sm">
                  {/* Grid dimensions: {gridWidth}×{gridHeight}px */}
                  Grid dimensions: {config.rows}×{config.columns}px
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          {/* <Button onClick={handleGenerate} disabled={exceedsLimit}> */}
          <Button onClick={handleGenerate}>
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
