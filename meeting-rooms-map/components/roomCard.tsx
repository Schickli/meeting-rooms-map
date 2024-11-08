import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { MeetingRoom } from "@/lib/meetingRoom";
import { getStatusName } from "@/lib/roomStatus";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export function RoomCard({ room, currentFocus, onLinkClick }: { room: MeetingRoom, currentFocus: MeetingRoom | null, onLinkClick: () => void }) {
    return (
      <Card className={`bg-gray-700 border-gray-600 transition-colors hover:bg-gray-600 ${currentFocus && currentFocus.id === room.id ? "bg-gray-600" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center gap-4">
            <CardTitle className="text-lg font-medium text-gray-100 truncate">{room.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mr-2 hover:bg-slate-500 p-1 rounded-full" onClick={onLinkClick}>
                    <Link href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                      <SquareArrowOutUpRight color="white" size={18} />
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white px-2 py-1 rounded text-sm mb-2">Book this room</TooltipContent>
              </Tooltip>
              <div className={`w-3 h-3 rounded-full ${room.status}`} />
              <span className="text-sm text-gray-400">{getStatusName(room.status)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300 line-clamp-2">{room.description}</CardDescription>
        </CardContent>
      </Card>
    );
  }