'use client'

import { MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for meeting rooms
const meetingRooms = [
  { id: 1, title: 'Boardroom A', description: 'Large conference room with video conferencing equipment', status: 'Available' },
  { id: 2, title: 'Huddle Space 1', description: 'Small room for quick meetings', status: 'Occupied' },
  { id: 3, title: 'Innovation Lab', description: 'Creative space with whiteboards and flexible seating', status: 'Available' },
  { id: 4, title: 'Executive Suite', description: 'High-end meeting room for client meetings', status: 'Maintenance' },
  { id: 5, title: 'Training Room', description: 'Large room with multiple screens for workshops', status: 'Available' },
]

export function DarkModeMeetingRoomLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 text-gray-100 p-4">
        <h1 className="text-2xl font-bold">Meeting Room Finder</h1>
      </nav>
      
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        <div className="w-full lg:w-1/2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Map</CardTitle>
              <CardDescription className="text-gray-400">Meeting room locations</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] bg-gray-700 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-gray-500" />
              <span className="ml-2 text-gray-500">Map placeholder</span>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Meeting Rooms</CardTitle>
              <CardDescription className="text-gray-400">Available spaces for your meetings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {meetingRooms.map((room) => (
                <Card key={room.id} className="bg-gray-700 border-gray-600">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium text-gray-100">
                        {room.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          room.status === 'Available' ? 'bg-green-500' :
                          room.status === 'Occupied' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`} />
                        <span className={`text-sm ${
                          room.status === 'Available' ? 'text-green-500' :
                          room.status === 'Occupied' ? 'text-red-500' :
                          'text-yellow-500'
                        }`}>
                          {room.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {room.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}