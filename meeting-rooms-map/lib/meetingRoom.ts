import { RoomStatus } from "./roomStatus";

export type MeetingRoom = {
    id: number;
    title: string;
    description: string;
    status: RoomStatus;
    coordinates: [number, number];
}