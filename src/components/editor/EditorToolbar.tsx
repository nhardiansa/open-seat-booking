import { useState } from 'react';
import {
  Undo, Redo, ZoomIn, ZoomOut, Download, Upload, Trash2,
  Settings, AlignLeft, AlignCenter, AlignRight,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/editorStore';

export function EditorToolbar() {
  const [showSettings, setShowSettings] = useState(false);
  const [tempWidth, setTempWidth] = useState(1000);
  const [tempHeight, setTempHeight] = useState(700);

  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const canUndo = useEditorStore((state) => state.canUndo);
  const canRedo = useEditorStore((state) => state.canRedo);
  const zoomIn = useEditorStore((state) => state.zoomIn);
  const zoomOut = useEditorStore((state) => state.zoomOut);
  const zoom = useEditorStore((state) => state.zoom);
  const setCanvasSize = useEditorStore((state) => state.setCanvasSize);
  const canvasWidth = useEditorStore((state) => state.canvasWidth);
  const canvasHeight = useEditorStore((state) => state.canvasHeight);
  const alignObjects = useEditorStore((state) => state.alignObjects);
  const selectedSeatIds = useEditorStore((state) => state.selectedSeatIds);
  const deleteSeat = useEditorStore((state) => state.deleteSeat);

  const hasSelection = selectedSeatIds.length > 0;

  const handleDelete = () => {
    selectedSeatIds.forEach(id => deleteSeat(id));
  };

  const handleOpenSettings = () => {
    setTempWidth(canvasWidth);
    setTempHeight(canvasHeight);
    setShowSettings(true);
  };

  const handleApplySettings = () => {
    setCanvasSize(tempWidth, tempHeight);
    setShowSettings(false);
  };

  return (
    <div className="h-12 bg-card border-b border-border flex items-center px-4 gap-1 relative">
      {/* Left: Undo/Redo */}
      <button
        onClick={undo}
        disabled={!canUndo()}
        className={cn(
          'h-8 w-8 flex items-center justify-center rounded-md transition-colors',
          !canUndo() ? 'text-muted-foreground/30 cursor-not-allowed' : 'text-muted-foreground hover:bg-accent'
        )}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo()}
        className={cn(
          'h-8 w-8 flex items-center justify-center rounded-md transition-colors',
          !canRedo() ? 'text-muted-foreground/30 cursor-not-allowed' : 'text-muted-foreground hover:bg-accent'
        )}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo className="h-4 w-4" />
      </button>

      <div className="w-px h-6 bg-border mx-2" />

      {/* Zoom Controls */}
      <button onClick={zoomOut} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Zoom Out">
        <ZoomOut className="h-4 w-4" />
      </button>
      <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
      <button onClick={zoomIn} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Zoom In">
        <ZoomIn className="h-4 w-4" />
      </button>

      <div className="w-px h-6 bg-border mx-2" />

      {/* Alignment (only when selection exists) */}
      {hasSelection && (
        <>
          <button onClick={() => alignObjects('left')} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Align Left">
            <AlignLeft className="h-4 w-4" />
          </button>
          <button onClick={() => alignObjects('center')} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Align Center">
            <AlignCenter className="h-4 w-4" />
          </button>
          <button onClick={() => alignObjects('right')} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Align Right">
            <AlignRight className="h-4 w-4" />
          </button>
          <button onClick={() => alignObjects('top')} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Align Top">
            <AlignStartVertical className="h-4 w-4" />
          </button>
          <button onClick={() => alignObjects('middle')} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Align Middle">
            <AlignCenterVertical className="h-4 w-4" />
          </button>
          <button onClick={() => alignObjects('bottom')} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Align Bottom">
            <AlignEndVertical className="h-4 w-4" />
          </button>
          <div className="w-px h-6 bg-border mx-2" />
        </>
      )}

      {/* Import/Export */}
      <button className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Import">
        <Upload className="h-4 w-4" />
      </button>
      <button className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent" title="Export">
        <Download className="h-4 w-4" />
      </button>

      <div className="w-px h-6 bg-border mx-2" />

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={!hasSelection}
        className={cn(
          'h-8 w-8 flex items-center justify-center rounded-md transition-colors',
          !hasSelection ? 'text-muted-foreground/30 cursor-not-allowed' : 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
        )}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Right: Settings */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{canvasWidth} × {canvasHeight}</span>
        <button
          onClick={handleOpenSettings}
          className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
          title="Canvas Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute top-12 right-4 bg-card border border-border rounded-lg shadow-lg p-4 z-50 w-64">
          <h3 className="font-semibold mb-3">Canvas Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Width (px)</label>
              <input
                type="number"
                value={tempWidth}
                onChange={(e) => setTempWidth(Number(e.target.value))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
                min={100}
                max={5000}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Height (px)</label>
              <input
                type="number"
                value={tempHeight}
                onChange={(e) => setTempHeight(Number(e.target.value))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
                min={100}
                max={5000}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-3 py-2 border border-input rounded-md text-sm hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySettings}
                className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
