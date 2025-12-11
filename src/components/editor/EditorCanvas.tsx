import React, { useState } from 'react';
import { Stage, Layer, Circle, Text, Group } from 'react-konva';
import { useEditorStore } from '@/store/editorStore';
import type { KonvaEventObject } from 'konva/lib/Node';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function EditorCanvas() {
  const seats = useEditorStore((state) => state.seats);
  const selectedSeatId = useEditorStore((state) => state.selectedSeatId);
  const selectSeat = useEditorStore((state) => state.selectSeat);
  const updateSeat = useEditorStore((state) => state.updateSeat);

  const isPlacementMode = useEditorStore((state) => state.isPlacementMode);
  const pendingSeats = useEditorStore((state) => state.pendingSeats);
  const confirmPlacement = useEditorStore((state) => state.confirmPlacement);
  const cancelPlacementMode = useEditorStore((state) => state.cancelPlacementMode);

  const [mousePos, setMousePos] = useState({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 });

  const handleSeatClick = (seatId: string) => {
    if (!isPlacementMode) {
      selectSeat(seatId);
    }
  };

  const handleSeatDragEnd = (seatId: string, e: KonvaEventObject<DragEvent>) => {
    const node = e.target;
    updateSeat(seatId, {
      x: node.x(),
      y: node.y(),
    });
  };

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (isPlacementMode) {
      // Place seats at mouse position
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        confirmPlacement(pos.x, pos.y);
      }
    } else if (e.target === e.target.getStage()) {
      // Deselect if clicking on empty canvas
      selectSeat(null);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (isPlacementMode) {
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        setMousePos(pos);
      }
    }
  };

  // Calculate preview grid
  const getPreviewSeats = () => {
    if (!isPlacementMode || pendingSeats.length === 0) return [];

    const cols = Math.ceil(Math.sqrt(pendingSeats.length));
    const rows = Math.ceil(pendingSeats.length / cols);
    const spacing = 35;

    const gridWidth = (cols - 1) * spacing;
    const gridHeight = (rows - 1) * spacing;
    const startX = mousePos.x - gridWidth / 2;
    const startY = mousePos.y - gridHeight / 2;

    return pendingSeats.map((seat, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      return {
        ...seat,
        x: startX + col * spacing,
        y: startY + row * spacing,
        index,
      };
    });
  };

  const previewSeats = getPreviewSeats();

  // Handle Escape key to cancel placement
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPlacementMode) {
        cancelPlacementMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlacementMode, cancelPlacementMode]);

  return (
    <div className="flex-1 bg-muted/30 overflow-auto flex items-center justify-center p-4">
      <div className="bg-background shadow-lg" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
        <Stage
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={handleStageClick}
          onMouseMove={handleMouseMove}
        >
          <Layer>
            {/* Render existing seats */}
            {seats.map((seat) => {
              const isSelected = seat.id === selectedSeatId;

              return (
                <Group key={seat.id}>
                  <Circle
                    x={seat.x}
                    y={seat.y}
                    radius={seat.radius}
                    fill={seat.color}
                    stroke={isSelected ? '#000' : undefined}
                    strokeWidth={isSelected ? 2 : 0}
                    draggable={!isPlacementMode}
                    onClick={() => handleSeatClick(seat.id)}
                    onDragEnd={(e) => handleSeatDragEnd(seat.id, e)}
                    shadowColor="black"
                    shadowBlur={isSelected ? 10 : 5}
                    shadowOpacity={isSelected ? 0.3 : 0.2}
                    shadowOffsetX={0}
                    shadowOffsetY={2}
                  />

                  {seat.label && (
                    <Text
                      x={seat.x - seat.radius}
                      y={seat.y - 6}
                      width={seat.radius * 2}
                      text={seat.label}
                      fontSize={12}
                      fontFamily="Arial"
                      fill="white"
                      align="center"
                      listening={false}
                    />
                  )}
                </Group>
              );
            })}

            {/* Render preview seats when in placement mode */}
            {isPlacementMode && previewSeats.map((seat, index) => (
              <Group key={`preview-${index}`}>
                <Circle
                  x={seat.x}
                  y={seat.y}
                  radius={seat.radius}
                  fill={seat.color}
                  opacity={0.6}
                  stroke="#000"
                  strokeWidth={1}
                  dash={[5, 5]}
                  listening={false}
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>

      {isPlacementMode && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg text-sm">
          Click on canvas to place {pendingSeats.length} seats • Press ESC to cancel
        </div>
      )}
    </div>
  );
}
