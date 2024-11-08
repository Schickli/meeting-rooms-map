export enum RoomStatus {
  Available = "bg-green-500",
  Occupied = "bg-red-500",
  Maintenance = "bg-yellow-500",
}

export function getStatusName(value: string): string | undefined {
  const roomStatusKeys = Object.keys(RoomStatus) as Array<
    keyof typeof RoomStatus
  >;
  return roomStatusKeys.find((key) => RoomStatus[key] === value);
}

export function getStatusShadowColor(status: RoomStatus): string {
  switch (status) {
    case RoomStatus.Available:
      return "rgba(52,211,153,0.9)";
    case RoomStatus.Maintenance:
      return "rgba(245,158,11,0.9)";
    case RoomStatus.Occupied:
      return "rgba(239,68,68,0.9)";
    default:
      return "rgba(163,163,163,0.9)";
  }
}
