import { useState } from 'react';
import { MousePointer2, Hand, Type, Square, Grid3x3 } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import { BulkAddSeatModal } from './toolbox/BulkAddSeatModal';
import { cn } from '@/lib/utils';

export function EditorToolbox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const startPlacementMode = useEditorStore((state) => state.startPlacementMode);
  const cancelPlacementMode = useEditorStore((state) => state.cancelPlacementMode);
  const isPlacementMode = useEditorStore((state) => state.isPlacementMode);

  const handleBulkAddConfirm = (rows: number, cols: number) => {
    startPlacementMode(rows, cols);
  };

  const handleCancelPlacement = () => {
    cancelPlacementMode();
  };

  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select', action: () => { } },
    { id: 'pan', icon: Hand, label: 'Pan', action: () => { } },
    { id: 'bulk-seat', icon: Grid3x3, label: 'Add Seats (Bulk)', action: () => setIsModalOpen(true) },
    { id: 'text', icon: Type, label: 'Text', action: () => { } },
    { id: 'shape', icon: Square, label: 'Shape', action: () => { } },
  ];

  return (
    <>
      <div className="w-10 bg-card border-r-2 border-r-[#E2E2E2] border-border flex flex-col items-center py-4 gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={tool.action}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-md',
              'hover:bg-accent transition-colors cursor-pointer',
              'text-muted-foreground hover:text-accent-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              tool.id === 'bulk-seat' && isPlacementMode && 'bg-primary text-primary-foreground'
            )}
            title={tool.label}
          >
            <tool.icon className="h-5 w-5" />
          </button>
        ))}

        {isPlacementMode && (
          <button
            onClick={handleCancelPlacement}
            className="mt-auto w-10 h-10 flex items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-xs font-semibold"
            title="Cancel placement"
          >
            ESC
          </button>
        )}
      </div>

      <BulkAddSeatModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleBulkAddConfirm}
      />
    </>
  );
}
