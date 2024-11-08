import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { MeetingRoom } from "@/lib/meetingRoom";
import { Map } from "./map";

export function MapSection({ points, onFocusChange }: { points: MeetingRoom[] | null, onFocusChange: (room: MeetingRoom | null) => void }) {
    return (
      <Card className="bg-gray-800 border-gray-700 lg:h-[98vh]">
        <CardHeader className="pb-4">
          <CardTitle className="text-gray-100">Map</CardTitle>
          <CardDescription className="text-gray-400">Meeting room locations</CardDescription>
        </CardHeader>
        <CardContent>
          <Map points={points} onFocusChange={onFocusChange} />
        </CardContent>
      </Card>
    );
  }