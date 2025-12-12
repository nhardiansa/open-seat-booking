import { Undo, Redo, ZoomIn, ZoomOut, Download, Upload, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EditorToolbar() {
  const actions = [
    { id: 'undo', icon: Undo, label: 'Undo' },
    { id: 'redo', icon: Redo, label: 'Redo' },
    { id: 'divider-1', divider: true },
    { id: 'zoom-in', icon: ZoomIn, label: 'Zoom In' },
    { id: 'zoom-out', icon: ZoomOut, label: 'Zoom Out' },
    { id: 'divider-2', divider: true },
    { id: 'upload', icon: Upload, label: 'Import' },
    { id: 'download', icon: Download, label: 'Export' },
    { id: 'divider-3', divider: true },
    { id: 'delete', icon: Trash2, label: 'Delete' },
  ];

  return (
    <div className="h-9 bg-card border-b-2 border-b-[#E2E2E2] border-border flex items-center px-4 gap-1">
      {actions.map((action) => {
        if (action.divider) {
          return (
            <div
              key={action.id}
              className="w-px h-6 bg-border mx-1"
            />
          );
        }

        return (
          <button
            key={action.id}
            onClick={() => { }}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded-md',
              'hover:bg-accent transition-colors',
              'text-muted-foreground hover:text-accent-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring'
            )}
            title={action.label}
          >
            {action.icon && <action.icon className="h-4 w-4" />}
          </button>
        );
      })}

      <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
        <span>100%</span>
      </div>
    </div>
  );
}
