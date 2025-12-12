import { useEditorStore } from '@/store/editorStore';
import { Trash2 } from 'lucide-react';

export function EditorSidebar() {
  const seats = useEditorStore((state) => state.seats);
  const landmarks = useEditorStore((state) => state.landmarks);
  const selectedSeatIds = useEditorStore((state) => state.selectedSeatIds);
  const selectedLandmarkId = useEditorStore((state) => state.selectedLandmarkId);
  const categories = useEditorStore((state) => state.categories);
  const updateSeat = useEditorStore((state) => state.updateSeat);
  const updateLandmark = useEditorStore((state) => state.updateLandmark);
  const deleteSeat = useEditorStore((state) => state.deleteSeat);
  const deleteLandmark = useEditorStore((state) => state.deleteLandmark);

  const selectedSeats = seats.filter((seat) => selectedSeatIds.includes(seat.id));
  const selectedLandmark = landmarks.find((lm) => lm.id === selectedLandmarkId);

  // Landmark selected
  if (selectedLandmark) {
    return (
      <div className="w-64 bg-card border-l border-border p-4 overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Landmark Properties</h3>
          <button
            onClick={() => deleteLandmark(selectedLandmark.id)}
            className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
            title="Delete landmark"
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
              value={selectedLandmark.label}
              onChange={(e) => updateLandmark(selectedLandmark.id, { label: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
            />
          </div>

          {/* Label Color */}
          <div>
            <label className="text-sm font-medium block mb-2">Label Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedLandmark.labelColor}
                onChange={(e) => updateLandmark(selectedLandmark.id, { labelColor: e.target.value })}
                className="h-10 w-16 rounded border border-input cursor-pointer"
              />
              <input
                type="text"
                value={selectedLandmark.labelColor}
                onChange={(e) => updateLandmark(selectedLandmark.id, { labelColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm"
              />
            </div>
          </div>

          {/* Label Size */}
          <div>
            <label className="text-sm font-medium block mb-2">Label Size: {selectedLandmark.labelSize}px</label>
            <input
              type="range"
              min="8"
              max="48"
              value={selectedLandmark.labelSize}
              onChange={(e) => updateLandmark(selectedLandmark.id, { labelSize: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Shape Color */}
          <div>
            <label className="text-sm font-medium block mb-2">Shape Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedLandmark.color}
                onChange={(e) => updateLandmark(selectedLandmark.id, { color: e.target.value })}
                className="h-10 w-16 rounded border border-input cursor-pointer"
              />
              <input
                type="text"
                value={selectedLandmark.color}
                onChange={(e) => updateLandmark(selectedLandmark.id, { color: e.target.value })}
                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium block mb-2">Category</label>
            <select
              value={selectedLandmark.category || ''}
              onChange={(e) => updateLandmark(selectedLandmark.id, { category: e.target.value || undefined })}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Size info */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Size</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Width</label>
                <input
                  type="number"
                  value={Math.round(selectedLandmark.width)}
                  onChange={(e) => updateLandmark(selectedLandmark.id, { width: Number(e.target.value) })}
                  className="w-full px-2 py-1 bg-background border border-input rounded text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Height</label>
                <input
                  type="number"
                  value={Math.round(selectedLandmark.height)}
                  onChange={(e) => updateLandmark(selectedLandmark.id, { height: Number(e.target.value) })}
                  className="w-full px-2 py-1 bg-background border border-input rounded text-xs"
                />
              </div>
            </div>
          </div>

          {/* Position info */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Position</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">X</label>
                <input
                  type="number"
                  value={Math.round(selectedLandmark.x)}
                  onChange={(e) => updateLandmark(selectedLandmark.id, { x: Number(e.target.value) })}
                  className="w-full px-2 py-1 bg-background border border-input rounded text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Y</label>
                <input
                  type="number"
                  value={Math.round(selectedLandmark.y)}
                  onChange={(e) => updateLandmark(selectedLandmark.id, { y: Number(e.target.value) })}
                  className="w-full px-2 py-1 bg-background border border-input rounded text-xs"
                />
              </div>
            </div>
          </div>

          {/* Rotation */}
          <div className="pt-4 border-t border-border">
            <label className="text-xs text-muted-foreground mb-2 block">Rotation: {Math.round(selectedLandmark.rotation)}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedLandmark.rotation}
              onChange={(e) => updateLandmark(selectedLandmark.id, { rotation: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  // No selection
  if (selectedSeats.length === 0) {
    return (
      <div className="w-64 bg-card border-l border-border p-4">
        <div className="text-center text-muted-foreground py-8">
          <p className="text-sm">No object selected</p>
          <p className="text-xs mt-2">Click on a seat or landmark to edit</p>
        </div>
      </div>
    );
  }

  // Multiple seats selected
  if (selectedSeats.length > 1) {
    return (
      <div className="w-64 bg-card border-l border-border p-4 overflow-y-auto">
        <div className="mb-4">
          <h3 className="font-semibold">Multiple Selected ({selectedSeats.length})</h3>
          <p className="text-xs text-muted-foreground">Bulk operations</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Apply Color to All</label>
            <div className="flex gap-2">
              <input
                type="color"
                onChange={(e) => selectedSeats.forEach(s => updateSeat(s.id, { color: e.target.value }))}
                className="h-10 w-16 rounded border border-input cursor-pointer"
              />
              <input
                type="text"
                placeholder="#ef4444"
                onChange={(e) => selectedSeats.forEach(s => updateSeat(s.id, { color: e.target.value }))}
                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Apply Category to All</label>
            <select
              onChange={(e) => selectedSeats.forEach(s => updateSeat(s.id, { category: e.target.value || undefined }))}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              defaultValue=""
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              onClick={() => selectedSeats.forEach(s => deleteSeat(s.id))}
              className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete All ({selectedSeats.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Single seat selected
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
        <div>
          <label className="text-sm font-medium block mb-2">Label</label>
          <input
            type="text"
            value={selectedSeat.label}
            onChange={(e) => updateSeat(selectedSeat.id, { label: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
          />
        </div>

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
              className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Category</label>
          <select
            value={selectedSeat.category || ''}
            onChange={(e) => updateSeat(selectedSeat.id, { category: e.target.value || undefined })}
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {selectedSeat.category && (
          <div className="pt-2 border-t border-border">
            <button
              onClick={() => {
                const cat = categories.find(c => c.id === selectedSeat.category);
                if (cat) updateSeat(selectedSeat.id, { color: cat.color });
              }}
              className="text-xs text-primary hover:underline"
            >
              Apply category color
            </button>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Position</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">X</label>
              <input
                type="number"
                value={Math.round(selectedSeat.x)}
                onChange={(e) => updateSeat(selectedSeat.id, { x: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-background border border-input rounded text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Y</label>
              <input
                type="number"
                value={Math.round(selectedSeat.y)}
                onChange={(e) => updateSeat(selectedSeat.id, { y: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-background border border-input rounded text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
