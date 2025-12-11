import React from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { useEditorStore } from '@/store/editorStore';
import type { KonvaEventObject } from 'konva/lib/Node';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function EditorCanvas() {
  const seats = useEditorStore((state) => state.seats);
  const selectedSeatId = useEditorStore((state) => state.selectedSeatId);
  const selectSeat = useEditorStore((state) => state.selectSeat);
  const updateSeat = useEditorStore((state) => state.updateSeat);

  const handleSeatClick = (seatId: string) => {
    selectSeat(seatId);
  };

  const handleSeatDragEnd = (seatId: string, e: KonvaEventObject<DragEvent>) => {
    const node = e.target;
    updateSeat(seatId, {
      x: node.x(),
      y: node.y(),
    });
  };

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    // Deselect if clicking on empty canvas
    if (e.target === e.target.getStage()) {
      selectSeat(null);
    }
  };

  return (
    <div className="flex-1 bg-muted/30 overflow-auto flex items-center justify-center p-4">
      <div className="bg-background shadow-lg" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
        <Stage
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={handleStageClick}
        >
          <Layer>
            {/* Render all seats */}
            {seats.map((seat) => {
              const isSelected = seat.id === selectedSeatId;

              return (
                <React.Fragment key={seat.id}>
                  {/* Seat circle */}
                  <Circle
                    x={seat.x}
                    y={seat.y}
                    radius={seat.radius}
                    fill={seat.color}
                    stroke={isSelected ? '#000' : undefined}
                    strokeWidth={isSelected ? 2 : 0}
                    draggable
                    onClick={() => handleSeatClick(seat.id)}
                    onDragEnd={(e) => handleSeatDragEnd(seat.id, e)}
                    shadowColor="black"
                    shadowBlur={isSelected ? 10 : 5}
                    shadowOpacity={isSelected ? 0.3 : 0.2}
                    shadowOffsetX={0}
                    shadowOffsetY={2}
                  />

                  {/* Seat label */}
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
                </React.Fragment>
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
