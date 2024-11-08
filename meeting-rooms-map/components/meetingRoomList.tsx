import { MeetingRoom } from "@/lib/meetingRoom";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoomCard } from "./roomCard";
import { RoomCardSkeleton } from "./roomCardSceleton";

export function MeetingRoomList({
  rooms,
  currentFocus,
}: {
  rooms: MeetingRoom[] | null;
  currentFocus: MeetingRoom | null;
}) {
  const roomRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (currentFocus && roomRefs.current[currentFocus.id]) {
      roomRefs.current[currentFocus.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentFocus?.id]);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-100">Meeting Rooms</CardTitle>
        <CardDescription className="text-gray-400">
          Available spaces for your meetings
        </CardDescription>
      </CardHeader>
      <CardContent className="relative p-0 h-[89vh] overflow-hidden">
        <ScrollArea className="w-full px-6">
          <div className="space-y-4 h-[85vh]">
            {rooms &&
              rooms.map((room) => (
                <div
                  key={room.id}
                  ref={(el) => {
                    roomRefs.current[room.id] = el;
                  }}
                >
                  <RoomCard
                    room={room}
                    currentFocus={currentFocus}
                    onLinkClick={() => {}}
                  />
                </div>
              ))}

            {rooms && rooms.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-400">
                No meeting rooms available
              </div>
            )}

            {!rooms && (
              <>
                <RoomCardSkeleton />
                <RoomCardSkeleton />
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
