import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BulkAddSeatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (rows: number, cols: number) => void;
}

export function BulkAddSeatModal({ open, onOpenChange, onConfirm }: BulkAddSeatModalProps) {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rows > 0 && cols > 0 && rows <= 50 && cols <= 50) {
      onConfirm(rows, cols);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Seats in Bulk</DialogTitle>
          <DialogDescription>
            Specify the number of rows and columns for the seat layout
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Rows Input */}
            <div>
              <label htmlFor="rows" className="block text-sm font-medium mb-2">
                Rows
              </label>
              <input
                id="rows"
                type="number"
                min="1"
                max="50"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Columns Input */}
            <div>
              <label htmlFor="cols" className="block text-sm font-medium mb-2">
                Columns
              </label>
              <input
                id="cols"
                type="number"
                min="1"
                max="50"
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Preview Info */}
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm text-muted-foreground">
              Total seats: <span className="font-semibold text-foreground">{rows * cols}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Click on canvas to place the seats
            </p>
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Create
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
