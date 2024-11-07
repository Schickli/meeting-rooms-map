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
