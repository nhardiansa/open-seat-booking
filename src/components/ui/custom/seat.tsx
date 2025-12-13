import { Circle } from "react-konva";

interface SeatProps {
  x: number;
  y: number;
  color: string;
  isDraggable?: boolean;
}

export function Seat({ x, y, color, isDraggable }: SeatProps) {
  return (
    // <div
    //   className="w-3 h-3 rounded-full bg-destructive hover:bg-destructive/80 cursor-pointer transition-colors"
    // />
    <Circle
      x={x}
      y={y}
      radius={8}
      fill={color}
      draggable={isDraggable}
    />
  )
}
