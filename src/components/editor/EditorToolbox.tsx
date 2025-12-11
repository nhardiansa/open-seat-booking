import { MousePointer2, Hand, Type, Square, Circle } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import { cn } from '@/lib/utils';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function EditorToolbox() {
  const addSeat = useEditorStore((state) => state.addSeat);

  const handleAddSeat = () => {
    // Add seat at center of canvas
    addSeat({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      radius: 15,
      color: '#ef4444',
      label: `S${Date.now().toString().slice(-3)}`,
    });
  };

  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select', action: () => { } },
    { id: 'pan', icon: Hand, label: 'Pan', action: () => { } },
    { id: 'seat', icon: Circle, label: 'Add Seat', action: handleAddSeat },
    { id: 'text', icon: Type, label: 'Text', action: () => { } },
    { id: 'shape', icon: Square, label: 'Shape', action: () => { } },
  ];

  return (
    <div className="w-14 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={tool.action}
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-md',
            'hover:bg-accent transition-colors',
            'text-muted-foreground hover:text-accent-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring'
          )}
          title={tool.label}
        >
          <tool.icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}
