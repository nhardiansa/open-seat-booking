import React, { useState } from 'react';
import { Stage, Layer, Circle, Text, Group, Rect } from 'react-konva';
import { useEditorStore } from '@/store/editorStore';
import type { KonvaEventObject } from 'konva/lib/Node';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 700;

export function EditorCanvas() {
  const seats = useEditorStore((state) => state.seats);
  const selectedSeatIds = useEditorStore((state) => state.selectedSeatIds);
  const selectSeat = useEditorStore((state) => state.selectSeat);
  const selectMultipleSeats = useEditorStore((state) => state.selectMultipleSeats);
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const updateSeat = useEditorStore((state) => state.updateSeat);

  const isPlacementMode = useEditorStore((state) => state.isPlacementMode);
  const pendingSeats = useEditorStore((state) => state.pendingSeats);
  const gridRows = useEditorStore((state) => state.gridRows);
  const gridCols = useEditorStore((state) => state.gridCols);
  const confirmPlacement = useEditorStore((state) => state.confirmPlacement);
  const cancelPlacementMode = useEditorStore((state) => state.cancelPlacementMode);

  const [mousePos, setMousePos] = useState({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 });

  // Store group drag offset
  const groupDragOffset = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Marquee selection state
  const [selectionRect, setSelectionRect] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isSelecting: false,
  });

  const handleSeatClick = (seatId: string, e: KonvaEventObject<MouseEvent>) => {
    if (isPlacementMode) return;

    e.cancelBubble = true; // Prevent stage click
    selectSeat(seatId);
  };

  // Handle single seat drag (when not in group)
  const handleSingleSeatDragEnd = (seatId: string, e: KonvaEventObject<DragEvent>) => {
    const node = e.target;
    updateSeat(seatId, {
      x: node.x(),
      y: node.y(),
    });
  };

  // Handle group drag start
  const handleGroupDragStart = (e: KonvaEventObject<DragEvent>) => {
    const group = e.target;
    groupDragOffset.current = {
      x: group.x(),
      y: group.y(),
    };
  };

  // Handle group drag end - update all selected seats
  const handleGroupDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const group = e.target;
    const deltaX = group.x() - groupDragOffset.current.x;
    const deltaY = group.y() - groupDragOffset.current.y;

    // Update all selected seats with the delta
    selectedSeatIds.forEach(id => {
      const seat = seats.find(s => s.id === id);
      if (seat) {
        updateSeat(id, {
          x: seat.x + deltaX,
          y: seat.y + deltaY,
        });
      }
    });

    // Reset group position to 0,0 for next drag
    group.position({ x: 0, y: 0 });
  };

  const handleStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    // Check if clicked on empty canvas (not on a seat)
    if (e.target !== e.target.getStage()) return;

    if (isPlacementMode) {
      // Place seats at mouse position
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        confirmPlacement(pos.x, pos.y);
      }
    } else {
      // Start marquee selection
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        setSelectionRect({
          startX: pos.x,
          startY: pos.y,
          endX: pos.x,
          endY: pos.y,
          isSelecting: true,
        });
      }
    }
  };

  const handleStageMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    if (isPlacementMode) {
      setMousePos(pos);
    } else if (selectionRect.isSelecting) {
      // Update marquee rectangle
      setSelectionRect(prev => ({
        ...prev,
        endX: pos.x,
        endY: pos.y,
      }));
    }
  };

  const handleStageMouseUp = () => {
    if (selectionRect.isSelecting) {
      // Detect seats inside selection rectangle
      const selected = detectSeatsInRect();
      if (selected.length > 0) {
        selectMultipleSeats(selected);
      } else {
        clearSelection();
      }

      // Clear selection rectangle
      setSelectionRect({
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        isSelecting: false,
      });
    }
  };

  // Detect which seats are inside the selection rectangle
  const detectSeatsInRect = () => {
    const { startX, startY, endX, endY } = selectionRect;

    // Calculate actual rectangle bounds (handle negative width/height)
    const left = Math.min(startX, endX);
    const right = Math.max(startX, endX);
    const top = Math.min(startY, endY);
    const bottom = Math.max(startY, endY);

    const selectedIds: string[] = [];

    seats.forEach((seat) => {
      // Check if seat center is inside rectangle
      if (
        seat.x >= left &&
        seat.x <= right &&
        seat.y >= top &&
        seat.y <= bottom
      ) {
        selectedIds.push(seat.id);
      }
    });

    return selectedIds;
  };

  // Calculate preview grid
  const getPreviewSeats = () => {
    if (!isPlacementMode || pendingSeats.length === 0) return [];

    const cols = gridCols;
    const rows = gridRows;
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

  // Calculate selection rectangle dimensions for rendering
  const getSelectionRectProps = () => {
    const { startX, startY, endX, endY } = selectionRect;
    return {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
    };
  };

  return (
    <div className="flex-1 bg-gray-200 overflow-auto flex items-center justify-center p-4">
      <div className="bg-[#f9fafb] shadow-lg" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
        <Stage
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseDown={handleStageMouseDown}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
        >
          <Layer>
            {/* Render NON-SELECTED seats (individually draggable) */}
            {seats.filter(seat => !selectedSeatIds.includes(seat.id)).map((seat) => (
              <Group key={seat.id}>
                <Circle
                  x={seat.x}
                  y={seat.y}
                  radius={seat.radius}
                  fill={seat.color}
                  draggable={!isPlacementMode && !selectionRect.isSelecting}
                  onClick={(e) => handleSeatClick(seat.id, e)}
                  onDragEnd={(e) => handleSingleSeatDragEnd(seat.id, e)}
                  shadowColor="black"
                  shadowBlur={5}
                  shadowOpacity={0.2}
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
            ))}

            {/* Render SELECTED seats in a DRAGGABLE GROUP (moves together in real-time) */}
            {selectedSeatIds.length > 0 && (
              <Group
                draggable={!isPlacementMode && !selectionRect.isSelecting}
                onDragStart={handleGroupDragStart}
                onDragEnd={handleGroupDragEnd}
              >
                {seats.filter(seat => selectedSeatIds.includes(seat.id)).map((seat) => (
                  <Group key={seat.id}>
                    <Circle
                      x={seat.x}
                      y={seat.y}
                      radius={seat.radius}
                      fill={seat.color}
                      stroke="#000"
                      strokeWidth={2}
                      onClick={(e) => handleSeatClick(seat.id, e)}
                      shadowColor="black"
                      shadowBlur={10}
                      shadowOpacity={0.3}
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
                ))}
              </Group>
            )}

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

            {/* Render marquee selection rectangle */}
            {selectionRect.isSelecting && (
              <Rect
                {...getSelectionRectProps()}
                fill="rgba(0, 123, 255, 0.1)"
                stroke="#007bff"
                strokeWidth={1}
                dash={[5, 5]}
                listening={false}
              />
            )}
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
