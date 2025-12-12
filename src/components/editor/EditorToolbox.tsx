import { useState } from 'react';
import { MousePointer2, Hand, Type, Square, Grid3x3 } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import { BulkAddSeatModal } from './toolbox/BulkAddSeatModal';
import { cn } from '@/lib/utils';

export function EditorToolbox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('select');

  const startPlacementMode = useEditorStore((state) => state.startPlacementMode);
  const cancelPlacementMode = useEditorStore((state) => state.cancelPlacementMode);
  const isPlacementMode = useEditorStore((state) => state.isPlacementMode);
  const addLandmark = useEditorStore((state) => state.addLandmark);
  const isPanning = useEditorStore((state) => state.isPanning);

  const handleBulkAddConfirm = (rows: number, cols: number) => {
    startPlacementMode(rows, cols);
  };

  const handleCancelPlacement = () => {
    cancelPlacementMode();
  };

  const handleAddLandmark = () => {
    addLandmark({
      x: 100,
      y: 100,
      width: 150,
      height: 80,
      rotation: 0,
      color: '#6366f1',
      label: 'Stage',
      labelColor: '#ffffff',
      labelSize: 14,
    });
  };

  const tools = [
    {
      id: 'select',
      icon: MousePointer2,
      label: 'Select',
      action: () => setActiveTool('select'),
    },
    {
      id: 'pan',
      icon: Hand,
      label: 'Pan (Hold Space)',
      action: () => setActiveTool('pan'),
    },
    {
      id: 'bulk-seat',
      icon: Grid3x3,
      label: 'Add Seats (Bulk)',
      action: () => setIsModalOpen(true),
    },
    {
      id: 'landmark',
      icon: Square,
      label: 'Add Landmark',
      action: handleAddLandmark,
    },
    {
      id: 'text',
      icon: Type,
      label: 'Text (Coming Soon)',
      action: () => { },
      disabled: true,
    },
  ];

  return (
    <>
      <div className="w-12 bg-card border-r border-border flex flex-col items-center py-4 gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={tool.action}
            disabled={tool.disabled}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-md',
              'hover:bg-accent transition-colors cursor-pointer',
              'text-muted-foreground hover:text-accent-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              tool.id === 'bulk-seat' && isPlacementMode && 'bg-primary text-primary-foreground',
              tool.id === 'pan' && isPanning && 'bg-primary text-primary-foreground',
              tool.id === activeTool && 'bg-accent',
              tool.disabled && 'opacity-30 cursor-not-allowed'
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
            title="Cancel placement (ESC)"
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
