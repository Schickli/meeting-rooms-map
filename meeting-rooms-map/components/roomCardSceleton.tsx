import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RoomCardSkeleton() {
  return (
    <Card className="bg-gray-700 border-gray-600 transition-colors h-24 animate-pulse">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center gap-4">
          <div className="bg-gray-500 w-1/2 h-5 rounded-md" />
          <div className="flex items-center space-x-2">
            <div className="bg-gray-500 p-1 rounded-full h-4 w-4" />
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <div className="bg-gray-500 w-20 h-5 rounded-md" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-500 w-full h-5 rounded-md mb-1" />
      </CardContent>
    </Card>
  );
}
