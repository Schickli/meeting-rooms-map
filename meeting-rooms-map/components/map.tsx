'use client';

import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MeetingRoom } from "@/lib/meetingRoom";

interface MapProps {
  coordinates?: [number, number];
  tilesetId?: string;
  height?: string;
  points: MeetingRoom[];
  onFocusChange: (point: MeetingRoom | null) => void;
}

export function Map({
  coordinates = [9.140628, 47.438596],
  tilesetId = "schickli.cm378dccq09501pphsmlf3hy7-5z9ia",
  height = "h-[85vh]",
  points = [],
  onFocusChange,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activePoint, setActivePoint] = useState<MeetingRoom | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (!token) {
      setError("Mapbox access token is required");
      return;
    }

    try {
      mapboxgl.accessToken = token;

      const bounds: [number, number, number, number] = [
        9.101499, 47.421499, // Southwest longitude, latitude
        9.179719, 47.461404, // Northeast longitude, latitude
      ];

      const zoom = 17;

      map.current = new MapboxMap({
        container: mapContainer.current,
        style: `mapbox://styles/schickli/cm37a7wyv006401q78cc9g2vx`,
        center: coordinates,
        zoom: zoom,
        maxZoom: zoom,
        minZoom: zoom,
        maxBounds: bounds,
        pitch: 65,
        maxPitch: 65,
        minPitch: 65,
        bearing: -30,
      });

      // Add the custom tileset layer
      map.current.on("style.load", () => {
        map.current?.addSource("custom-tileset", {
          type: "geojson",
          data: `uzwilBuhler.json`,
        });

        map.current?.addLayer({
          id: "custom-tileset-layer",
          type: "fill",
          source: "custom-tileset",
          paint: {
            "fill-color": "#088",
            "fill-opacity": 0.2,
            "fill-outline-color": "#000",
          },
        });

        points.forEach(point => {
          const el = document.createElement('div');
          el.className = 'marker ' + point.status;
          el.style.height = '15px'; // Increase the size
          el.style.width = '15px';  // Increase the size
          el.style.borderRadius = '50%';
          el.style.position = 'relative';
          el.style.cursor = 'pointer';

          // Invisible box for easier click
          const invisibleBox = document.createElement('div');
          invisibleBox.style.position = 'absolute';
          invisibleBox.style.top = '-10px';
          invisibleBox.style.left = '-10px';
          invisibleBox.style.height = '30px';
          invisibleBox.style.width = '30px';
          invisibleBox.style.cursor = 'pointer';

          const markerContainer = document.createElement('div');
          markerContainer.className = "flex items-center";
          markerContainer.appendChild(el);
          markerContainer.appendChild(invisibleBox);

          new mapboxgl.Marker(markerContainer)
            .setLngLat(point.coordinates)
            .addTo(map.current!);

          markerContainer.addEventListener('click', () => {
            onFocusChange(point);
            setActivePoint(point);
          });
        });

        // Handle overall map click to reset active point
        map.current?.on('click', (e) => {
          if (!e.defaultPrevented) {
            onFocusChange(null);
            setActivePoint(null);
          }
        });
      });

      // map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    } catch (err) {
      setError("Error initializing map: " + (err as Error).message);
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [tilesetId, points]);

  if (error) {
    return (
      <div className={`relative w-full ${height} flex items-center justify-center`}>
        <div className="bg-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${height}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}
