import { Undo, Redo, ZoomIn, ZoomOut, Download, Upload, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/editorStore';

export function EditorToolbar() {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const canUndo = useEditorStore((state) => state.canUndo);
  const canRedo = useEditorStore((state) => state.canRedo);

  const actions = [
    {
      id: 'undo',
      icon: Undo,
      label: 'Undo (Ctrl+Z)',
      action: undo,
      disabled: !canUndo,
    },
    {
      id: 'redo',
      icon: Redo,
      label: 'Redo (Ctrl+Shift+Z)',
      action: redo,
      disabled: !canRedo,
    },
    { id: 'divider-1', divider: true },
    { id: 'zoom-in', icon: ZoomIn, label: 'Zoom In', disabled: false },
    { id: 'zoom-out', icon: ZoomOut, label: 'Zoom Out', disabled: false },
    { id: 'divider-2', divider: true },
    { id: 'upload', icon: Upload, label: 'Import', disabled: false },
    { id: 'download', icon: Download, label: 'Export', disabled: false },
    { id: 'divider-3', divider: true },
    { id: 'delete', icon: Trash2, label: 'Delete', disabled: false },
  ];

  return (
    <div className="h-12 bg-card border-b border-border flex items-center px-4 gap-1">
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
            onClick={action.action || (() => { })}
            disabled={action.disabled}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded-md',
              'transition-colors',
              action.disabled
                ? 'text-muted-foreground/30 cursor-not-allowed'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
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
