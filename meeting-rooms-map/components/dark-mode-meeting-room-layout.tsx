"use client";

import { useState, useRef, useEffect } from "react";
import { getStatusName, RoomStatus } from "@/lib/roomStatus";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Map } from "@/components/map";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MeetingRoom } from "@/lib/meetingRoom";
import { SquareArrowOutUpRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";

// Mock data for meeting rooms
const meetingRooms = [
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

export function DarkModeMeetingRoomLayout() {
  const [currentFocus, setCurrentFocus] = useState<MeetingRoom | null>(null);
  const roomRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleFocusChange = (point: MeetingRoom | null) => {
    if (point) {
      setCurrentFocus(point);
      if (roomRefs.current[point.id]) {
        roomRefs.current[point.id]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  useEffect(() => {
    if (currentFocus && roomRefs.current[currentFocus.id]) {
      roomRefs.current[currentFocus.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentFocus]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow flex flex-col lg:flex-row p-[1vh] gap-4">
        {/* Map Section */}
        <div className="w-full lg:w-1/2">
          <Card className="bg-gray-800 border-gray-700 lg:h-[98vh]">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-100">Map</CardTitle>
              <CardDescription className="text-gray-400">
                Meeting room locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Map points={meetingRooms} onFocusChange={handleFocusChange} />
            </CardContent>
          </Card>
        </div>

        {/* Meeting Rooms Section */}
        <div className="w-full lg:w-1/2 overflow-hidden">
          <Card className="bg-gray-800 border-gray-700 lg:h-[98vh]">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-100">Meeting Rooms</CardTitle>
              <CardDescription className="text-gray-400">
                Available spaces for your meetings
              </CardDescription>
            </CardHeader>
            <CardContent className="relative p-0 overflow-hidden">
              <div className="absolute w-full z-50 bottom-0 h-24 bg-gradient-to-t  from-black/80"></div>
              <ScrollArea className="h-[calc(98vh-120px)] lg:h-[calc(90vh)] px-6">
                <div className="space-y-4 pb-6">
                  {meetingRooms.map((room: MeetingRoom) => (
                    <div
                      ref={(el) => {
                        roomRefs.current[room.id] = el;
                      }}
                      key={room.id}
                    >
                      <Card
                        className={`bg-gray-700 border-gray-600 transition-colors hover:bg-gray-600 ${
                          currentFocus && currentFocus.id === room.id
                            ? "bg-gray-600"
                            : ""
                        }`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center gap-4">
                            <CardTitle className="text-lg font-medium text-gray-100 truncate">
                              {room.title}
                            </CardTitle>
                            <div className="flex items-center flex-shrink-0 space-x-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="mr-2 hover:bg-slate-500 p-1 rounded-full">
                                    <Link href={"https://www.example.com"} target="_blank">
                                      <SquareArrowOutUpRight
                                        color="white"
                                        size={18}
                                      />
                                    </Link>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>Book this room</TooltipContent>
                              </Tooltip>

                              <div
                                className={`w-3 h-3 rounded-full ${room.status}`}
                              />
                              <span className="text-sm text-gray-400">
                                {getStatusName(room.status)}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-300 line-clamp-2">
                            {room.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
