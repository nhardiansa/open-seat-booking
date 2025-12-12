import { useEditorStore } from '@/store/editorStore';
import { Trash2 } from 'lucide-react';

export function EditorSidebar() {
  const seats = useEditorStore((state) => state.seats);
  const selectedSeatIds = useEditorStore((state) => state.selectedSeatIds);
  const categories = useEditorStore((state) => state.categories);
  const updateSeat = useEditorStore((state) => state.updateSeat);
  const deleteSeat = useEditorStore((state) => state.deleteSeat);

  const selectedSeats = seats.filter((seat) => selectedSeatIds.includes(seat.id));

  // No selection
  if (selectedSeats.length === 0) {
    return (
      <div className="w-64 bg-card border-l border-border p-4">
        <div className="text-center text-muted-foreground py-8">
          <p className="text-sm">No object selected</p>
          <p className="text-xs mt-2">Click on a seat or drag to select multiple</p>
        </div>
      </div>
    );
  }

  // Multiple selection
  if (selectedSeats.length > 1) {
    return (
      <div className="w-64 bg-card border-l border-border p-4 overflow-y-auto">
        <div className="mb-4">
          <h3 className="font-semibold">Multiple Selected ({selectedSeats.length})</h3>
          <p className="text-xs text-muted-foreground">Bulk operations</p>
        </div>

        <div className="space-y-4">
          {/* Bulk Color */}
          <div>
            <label className="text-sm font-medium block mb-2">Apply Color to All</label>
            <div className="flex gap-2">
              <input
                type="color"
                onChange={(e) => {
                  selectedSeats.forEach(seat => updateSeat(seat.id, { color: e.target.value }));
                }}
                className="h-10 w-16 rounded border border-input cursor-pointer"
              />
              <input
                type="text"
                placeholder="#ef4444"
                onChange={(e) => {
                  selectedSeats.forEach(seat => updateSeat(seat.id, { color: e.target.value }));
                }}
                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Bulk Category */}
          <div>
            <label className="text-sm font-medium block mb-2">Apply Category to All</label>
            <select
              onChange={(e) => {
                const category = e.target.value || undefined;
                selectedSeats.forEach(seat => updateSeat(seat.id, { category }));
              }}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              defaultValue=""
            >
              <option value="">Select category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Delete All */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={() => {
                selectedSeats.forEach(seat => deleteSeat(seat.id));
              }}
              className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete All ({selectedSeats.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Single selection
  const selectedSeat = selectedSeats[0];

  return (
    <div className="w-64 bg-card border-l border-border p-4 overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Seat Properties</h3>
        <button
          onClick={() => deleteSeat(selectedSeat.id)}
          className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
          title="Delete seat"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Label */}
        <div>
          <label className="text-sm font-medium block mb-2">Label</label>
          <input
            type="text"
            value={selectedSeat.label}
            onChange={(e) => updateSeat(selectedSeat.id, { label: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Color */}
        <div>
          <label className="text-sm font-medium block mb-2">Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={selectedSeat.color}
              onChange={(e) => updateSeat(selectedSeat.id, { color: e.target.value })}
              className="h-10 w-16 rounded border border-input cursor-pointer"
            />
            <input
              type="text"
              value={selectedSeat.color}
              onChange={(e) => updateSeat(selectedSeat.id, { color: e.target.value })}
              className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium block mb-2">Category</label>
          <select
            value={selectedSeat.category || ''}
            onChange={(e) => updateSeat(selectedSeat.id, { category: e.target.value || undefined })}
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category color helper */}
        {selectedSeat.category && (
          <div className="pt-2 border-t border-border">
            <button
              onClick={() => {
                const category = categories.find((c) => c.id === selectedSeat.category);
                if (category) {
                  updateSeat(selectedSeat.id, { color: category.color });
                }
              }}
              className="text-xs text-primary hover:underline"
            >
              Apply category color
            </button>
          </div>
        )}

        {/* Position info */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Position</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">X</label>
              <input
                type="number"
                value={Math.round(selectedSeat.x)}
                onChange={(e) => updateSeat(selectedSeat.id, { x: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-background border border-input rounded text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Y</label>
              <input
                type="number"
                value={Math.round(selectedSeat.y)}
                onChange={(e) => updateSeat(selectedSeat.id, { y: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-background border border-input rounded text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
