import { Circle, Group, Text } from "react-konva";

interface SeatProps {
  x: number;
  y: number;
  color: string;
  storeColor?: string;
  isDraggable?: boolean;
  seatNumber?: string;
  fontSize?: number;
}

export function Seat({ x, y, color, storeColor, isDraggable, seatNumber, fontSize }: SeatProps) {

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
              stroke={storeColor}
              strokeWidth={storeColor ? 1 : 0}
              radius={8}
              fill={color}
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
