"use client";

import { useState, useRef, useEffect } from "react";
import { getStatusName, RoomStatus } from "@/lib/roomStatus";
import { MeetingRoom } from "@/lib/meetingRoom";
import { MapSection } from "@/components/mapSection";
import { MeetingRoomList } from "@/components/meetingRoomList";

// fake data until real api
const fetchMeetingRooms = async () => {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      title: "Boardroom A",
      description: "Large conference room with video conferencing equipment",
      status: RoomStatus.Available,
      coordinates: [9.1405, 47.4421],
    },
    {
      id: 2,
      title: "Huddle Space 1",
      description: "Small room for quick meetings",
      status: RoomStatus.Maintenance,
      coordinates: [9.1376, 47.4385],
    },
    {
      id: 3,
      title: "Innovation Lab",
      description: "Creative space with whiteboards and flexible seating",
      status: RoomStatus.Available,
      coordinates: [9.1419, 47.4392],
    },
    {
      id: 4,
      title: "Executive Suite",
      description: "High-end meeting room for client meetings",
      status: RoomStatus.Occupied,
      coordinates: [9.1395, 47.4375],
    },
    {
      id: 5,
      title: "Training Room",
      description: "Large room with multiple screens for workshops",
      status: RoomStatus.Available,
      coordinates: [9.1376, 47.4409],
    },
    {
      id: 6,
      title: "Breakout Room",
      description: "Casual space for brainstorming and collaboration",
      status: RoomStatus.Available,
      coordinates: [9.1355, 47.4397],
    },
    {
      id: 7,
      title: "Focus Room",
      description: "Quiet space for individual work or phone calls",
      status: RoomStatus.Available,
      coordinates: [9.1403, 47.4423],
    },
    {
      id: 8,
      title: "Wellness Room",
      description: "Private room for relaxation and meditation",
      status: RoomStatus.Available,
      coordinates: [9.1421, 47.4391],
    },
    {
      id: 9,
      title: "Podcast Studio",
      description: "Soundproof room with recording equipment",
      status: RoomStatus.Available,
      coordinates: [9.1416, 47.44],
    },
    {
      id: 10,
      title: "Green Room",
      description: "Prep area for speakers and presenters",
      status: RoomStatus.Available,
      coordinates: [9.1407, 47.4415],
    },
  ] as MeetingRoom[];
};

export function DarkModeMeetingRoomLayout() {
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentFocus, setCurrentFocus] = useState<MeetingRoom | null>(null);

  useEffect(() => {
    const loadMeetingRooms = async () => {
      try {
        const rooms = await fetchMeetingRooms();
        setMeetingRooms(rooms);
        setError(null);
      } catch (e) {
        setError("Failed to load meeting rooms. Please try again later.");
      }
    };

    loadMeetingRooms();
  }, []);

  const handleFocusChange = (room: MeetingRoom | null) => setCurrentFocus(room);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow flex flex-col lg:flex-row p-[1vh] gap-4">
        {/* Map Section */}
        <div className="w-full lg:w-1/2">
          <MapSection points={meetingRooms} onFocusChange={handleFocusChange} />
        </div>

        {/* Meeting Rooms Section */}
        <div className="w-full lg:w-1/2 overflow-hidden">
          {error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          ) : (
            <MeetingRoomList rooms={meetingRooms} currentFocus={currentFocus} />
          )}
        </div>
      </main>
    </div>
  );
}
