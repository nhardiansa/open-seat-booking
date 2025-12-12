import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Circle, Text, Group, Rect, Transformer } from 'react-konva';
import { useEditorStore } from '@/store/editorStore';
import type { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';

export function EditorCanvas() {
  const canvasWidth = useEditorStore((state) => state.canvasWidth);
  const canvasHeight = useEditorStore((state) => state.canvasHeight);
  const seats = useEditorStore((state) => state.seats);
  const landmarks = useEditorStore((state) => state.landmarks);
  const selectedSeatIds = useEditorStore((state) => state.selectedSeatIds);
  const selectedLandmarkId = useEditorStore((state) => state.selectedLandmarkId);
  const selectSeat = useEditorStore((state) => state.selectSeat);
  const selectLandmark = useEditorStore((state) => state.selectLandmark);
  const selectMultipleSeats = useEditorStore((state) => state.selectMultipleSeats);
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const updateSeat = useEditorStore((state) => state.updateSeat);
  const updateLandmark = useEditorStore((state) => state.updateLandmark);

  const isPlacementMode = useEditorStore((state) => state.isPlacementMode);
  const pendingSeats = useEditorStore((state) => state.pendingSeats);
  const gridRows = useEditorStore((state) => state.gridRows);
  const gridCols = useEditorStore((state) => state.gridCols);
  const confirmPlacement = useEditorStore((state) => state.confirmPlacement);
  const cancelPlacementMode = useEditorStore((state) => state.cancelPlacementMode);

  // Zoom & Pan
  const zoom = useEditorStore((state) => state.zoom);
  const setZoom = useEditorStore((state) => state.setZoom);
  const stagePosition = useEditorStore((state) => state.stagePosition);
  const setStagePosition = useEditorStore((state) => state.setStagePosition);
  const isPanning = useEditorStore((state) => state.isPanning);
  const setPanning = useEditorStore((state) => state.setPanning);

  const [mousePos, setMousePos] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });
  const groupDragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const selectedLandmarkRef = useRef<Konva.Rect>(null);

  // Marquee selection state
  const [selectionRect, setSelectionRect] = useState({
    startX: 0, startY: 0, endX: 0, endY: 0, isSelecting: false,
  });

  // Handle spacebar for panning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && !isPanning) {
        e.preventDefault();
        setPanning(true);
      }
      if (e.key === 'Escape' && isPlacementMode) {
        cancelPlacementMode();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setPanning(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPanning, setPanning, isPlacementMode, cancelPlacementMode]);

  // Attach transformer to selected landmark
  useEffect(() => {
    if (selectedLandmarkId && transformerRef.current && selectedLandmarkRef.current) {
      transformerRef.current.nodes([selectedLandmarkRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  }, [selectedLandmarkId]);

  // Wheel zoom
  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    if (e.evt.ctrlKey) {
      const scaleBy = 1.1;
      const newZoom = e.evt.deltaY > 0 ? zoom / scaleBy : zoom * scaleBy;
      setZoom(Math.min(3, Math.max(0.1, newZoom)));
    }
  };

  // Stage drag for panning
  const handleStageDragEnd = (e: KonvaEventObject<DragEvent>) => {
    if (isPanning) {
      setStagePosition({ x: e.target.x(), y: e.target.y() });
    }
  };

  const handleSeatClick = (seatId: string, e: KonvaEventObject<MouseEvent>) => {
    if (isPlacementMode || isPanning) return;
    e.cancelBubble = true;
    selectSeat(seatId);
  };

  const handleLandmarkClick = (landmarkId: string, e: KonvaEventObject<MouseEvent>) => {
    if (isPlacementMode || isPanning) return;
    e.cancelBubble = true;
    selectLandmark(landmarkId);
  };

  const handleSingleSeatDragEnd = (seatId: string, e: KonvaEventObject<DragEvent>) => {
    updateSeat(seatId, { x: e.target.x(), y: e.target.y() });
  };

  const handleLandmarkTransformEnd = (landmarkId: string, e: KonvaEventObject<Event>) => {
    const node = e.target as Konva.Rect;
    updateLandmark(landmarkId, {
      x: node.x(),
      y: node.y(),
      width: node.width() * node.scaleX(),
      height: node.height() * node.scaleY(),
      rotation: node.rotation(),
    });
    node.scaleX(1);
    node.scaleY(1);
  };

  const handleGroupDragStart = (e: KonvaEventObject<DragEvent>) => {
    groupDragOffset.current = { x: e.target.x(), y: e.target.y() };
  };

  const handleGroupDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const deltaX = e.target.x() - groupDragOffset.current.x;
    const deltaY = e.target.y() - groupDragOffset.current.y;
    selectedSeatIds.forEach(id => {
      const seat = seats.find(s => s.id === id);
      if (seat) updateSeat(id, { x: seat.x + deltaX, y: seat.y + deltaY });
    });
    e.target.position({ x: 0, y: 0 });
  };

  const handleStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (isPanning) return;

    // Get the clicked target
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.attrs?.name === 'canvas-bg';
    if (!clickedOnEmpty) return;

    if (isPlacementMode) {
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) confirmPlacement((pos.x - stagePosition.x) / zoom, (pos.y - stagePosition.y) / zoom);
    } else {
      // Start marquee selection
      const stage = e.target.getStage();
      const pos = stage?.getPointerPosition();
      if (pos) {
        const x = (pos.x - stagePosition.x) / zoom;
        const y = (pos.y - stagePosition.y) / zoom;
        clearSelection(); // Clear existing selection first
        setSelectionRect({ startX: x, startY: y, endX: x, endY: y, isSelecting: true });
      }
    }
  };

  const handleStageMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    const x = (pos.x - stagePosition.x) / zoom;
    const y = (pos.y - stagePosition.y) / zoom;

    if (isPlacementMode) {
      setMousePos({ x, y });
    } else if (selectionRect.isSelecting) {
      setSelectionRect(prev => ({ ...prev, endX: x, endY: y }));
    }
  };

  const handleStageMouseUp = () => {
    if (selectionRect.isSelecting) {
      const selected = detectSeatsInRect();
      if (selected.length > 0) selectMultipleSeats(selected);
      else clearSelection();
      setSelectionRect({ startX: 0, startY: 0, endX: 0, endY: 0, isSelecting: false });
    }
  };

  const detectSeatsInRect = () => {
    const { startX, startY, endX, endY } = selectionRect;
    const left = Math.min(startX, endX), right = Math.max(startX, endX);
    const top = Math.min(startY, endY), bottom = Math.max(startY, endY);
    return seats.filter(s => s.x >= left && s.x <= right && s.y >= top && s.y <= bottom).map(s => s.id);
  };

  const getPreviewSeats = () => {
    if (!isPlacementMode || pendingSeats.length === 0) return [];
    const cols = gridCols, rows = gridRows, spacing = 35;
    const gridWidth = (cols - 1) * spacing, gridHeight = (rows - 1) * spacing;
    const startX = mousePos.x - gridWidth / 2, startY = mousePos.y - gridHeight / 2;
    return pendingSeats.map((seat, i) => ({
      ...seat, x: startX + (i % cols) * spacing, y: startY + Math.floor(i / cols) * spacing, index: i,
    }));
  };

  const previewSeats = getPreviewSeats();
  // Show minimap only when zoomed in (> 100%)
  const showMinimap = zoom > 1;

  const minimapScale = 0.1;
  const viewportWidth = (canvasWidth + 200) / zoom;
  const viewportHeight = (canvasHeight + 100) / zoom;

  return (
    <div className="flex-1 bg-gray-200 overflow-hidden flex items-center justify-center relative" style={{ cursor: isPanning ? 'grab' : 'default' }}>
      <div className="bg-gray-300 shadow-lg overflow-hidden" style={{ width: canvasWidth + 200, height: canvasHeight + 100 }}>
        <Stage
          ref={stageRef}
          width={canvasWidth + 200}
          height={canvasHeight + 100}
          scaleX={zoom}
          scaleY={zoom}
          x={stagePosition.x}
          y={stagePosition.y}
          draggable={isPanning}
          onDragEnd={handleStageDragEnd}
          onWheel={handleWheel}
          onMouseDown={handleStageMouseDown}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
        >
          <Layer>
            {/* Canvas boundary */}
            <Rect name="canvas-bg" x={0} y={0} width={canvasWidth} height={canvasHeight} fill="#ffffff" stroke="#e5e7eb" strokeWidth={1} />

            {/* Landmarks */}
            {landmarks.map((lm) => {
              const isSelected = lm.id === selectedLandmarkId;
              return (
                <React.Fragment key={lm.id}>
                  <Rect
                    ref={isSelected ? selectedLandmarkRef : null}
                    x={lm.x}
                    y={lm.y}
                    width={lm.width}
                    height={lm.height}
                    rotation={lm.rotation}
                    fill={lm.color}
                    stroke={isSelected ? '#000' : undefined}
                    strokeWidth={isSelected ? 2 : 0}
                    draggable={!isPanning}
                    onClick={(e) => handleLandmarkClick(lm.id, e)}
                    onDragEnd={(e) => updateLandmark(lm.id, { x: e.target.x(), y: e.target.y() })}
                    onTransformEnd={(e) => handleLandmarkTransformEnd(lm.id, e)}
                  />
                  <Text
                    x={lm.x}
                    y={lm.y + lm.height / 2 - lm.labelSize / 2}
                    width={lm.width}
                    text={lm.label}
                    fontSize={lm.labelSize}
                    fill={lm.labelColor}
                    align="center"
                    listening={false}
                    rotation={lm.rotation}
                  />
                </React.Fragment>
              );
            })}

            {/* Non-selected seats */}
            {seats.filter(s => !selectedSeatIds.includes(s.id)).map((seat) => (
              <Group key={seat.id}>
                <Circle
                  x={seat.x} y={seat.y} radius={seat.radius} fill={seat.color}
                  draggable={!isPanning && !isPlacementMode && !selectionRect.isSelecting}
                  onClick={(e) => handleSeatClick(seat.id, e)}
                  onDragEnd={(e) => handleSingleSeatDragEnd(seat.id, e)}
                  shadowColor="black" shadowBlur={5} shadowOpacity={0.2} shadowOffsetY={2}
                />
                {seat.label && (
                  <Text x={seat.x - seat.radius} y={seat.y - 6} width={seat.radius * 2}
                    text={seat.label} fontSize={12} fill="white" align="center" listening={false} />
                )}
              </Group>
            ))}

            {/* Selected seats (group drag) */}
            {selectedSeatIds.length > 0 && (
              <Group draggable={!isPanning && !isPlacementMode} onDragStart={handleGroupDragStart} onDragEnd={handleGroupDragEnd}>
                {seats.filter(s => selectedSeatIds.includes(s.id)).map((seat) => (
                  <Group key={seat.id}>
                    <Circle x={seat.x} y={seat.y} radius={seat.radius} fill={seat.color}
                      stroke="#000" strokeWidth={2} onClick={(e) => handleSeatClick(seat.id, e)}
                      shadowColor="black" shadowBlur={10} shadowOpacity={0.3} shadowOffsetY={2} />
                    {seat.label && (
                      <Text x={seat.x - seat.radius} y={seat.y - 6} width={seat.radius * 2}
                        text={seat.label} fontSize={12} fill="white" align="center" listening={false} />
                    )}
                  </Group>
                ))}
              </Group>
            )}

            {/* Preview seats */}
            {isPlacementMode && previewSeats.map((seat, i) => (
              <Circle key={`preview-${i}`} x={seat.x} y={seat.y} radius={seat.radius}
                fill={seat.color} opacity={0.6} stroke="#000" strokeWidth={1} dash={[5, 5]} listening={false} />
            ))}

            {/* Selection rectangle */}
            {selectionRect.isSelecting && (
              <Rect
                x={Math.min(selectionRect.startX, selectionRect.endX)}
                y={Math.min(selectionRect.startY, selectionRect.endY)}
                width={Math.abs(selectionRect.endX - selectionRect.startX)}
                height={Math.abs(selectionRect.endY - selectionRect.startY)}
                fill="rgba(0, 123, 255, 0.1)" stroke="#007bff" strokeWidth={1} dash={[5, 5]} listening={false}
              />
            )}

            {/* Transformer for landmarks */}
            <Transformer ref={transformerRef} rotateEnabled={true} enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />
          </Layer>
        </Stage>
      </div>

      {/* Minimap */}
      {showMinimap && (
        <div className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded shadow-lg p-1" style={{ width: canvasWidth * minimapScale + 20, height: canvasHeight * minimapScale + 20 }}>
          <div className="relative" style={{ width: canvasWidth * minimapScale, height: canvasHeight * minimapScale, background: '#f9fafb' }}>
            {seats.map(s => (
              <div key={s.id} className="absolute rounded-full" style={{
                left: s.x * minimapScale - 2, top: s.y * minimapScale - 2,
                width: 4, height: 4, background: s.color,
              }} />
            ))}
            {landmarks.map(lm => (
              <div key={lm.id} className="absolute" style={{
                left: lm.x * minimapScale, top: lm.y * minimapScale,
                width: lm.width * minimapScale, height: lm.height * minimapScale, background: lm.color, opacity: 0.7,
              }} />
            ))}
            {/* Viewport indicator */}
            <div className="absolute border-2 border-blue-500" style={{
              left: -stagePosition.x / zoom * minimapScale,
              top: -stagePosition.y / zoom * minimapScale,
              width: viewportWidth * minimapScale,
              height: viewportHeight * minimapScale,
            }} />
          </div>
        </div>
      )}

      {isPlacementMode && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg text-sm">
          Click on canvas to place {pendingSeats.length} seats • Press ESC to cancel
        </div>
      )}

      {isPanning && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm">
          Pan Mode - Release Space to exit
        </div>
      )}
    </div>
  );
}
