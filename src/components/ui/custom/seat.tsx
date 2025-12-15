import { Circle, Group, Text } from "react-konva";

export interface SeatProps {
  x: number;
  y: number;
  color: string;
  strokeColor?: string;
  isDraggable?: boolean;
  seatNumber?: string;
  fontSize?: number;
  opacity?: number;
}

export function Seat({ x, y, color, strokeColor, isDraggable, seatNumber, fontSize, opacity }: SeatProps) {

  return (
    <>
      {
        seatNumber ? (
          <Group
            x={x}
            y={y}
            draggable={isDraggable}
          >
            <Circle
              width={16}
              height={16}
              stroke={strokeColor}
              strokeWidth={strokeColor ? 1 : 0}
              radius={8}
              fill={color}
              opacity={opacity || 1}
            />
            <Text
              text={seatNumber}
              fontSize={fontSize || 4}
              fill="#E03838"
              width={18}
              height={16}
              align="center"
              verticalAlign="middle"
              offset={{ x: 9, y: 8 }}
            />
          </Group>
        ) : (
          <Circle
            x={x}
            y={y}
            radius={8}
            fill={color}
            draggable={isDraggable}
          />
        )
      }
    </>
  )
}
