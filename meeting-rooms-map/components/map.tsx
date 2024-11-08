"use client";

import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MeetingRoom } from "@/lib/meetingRoom";
import { getStatusShadowColor } from "@/lib/roomStatus";
import { useToast } from "@/hooks/use-toast";

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
  const [mapStatus, setMapStatus] = useState<"loading" | "success">(
    "loading"
  );
  const [activePoint, setActivePoint] = useState<MeetingRoom | null>(null);
  const { toast } = useToast()

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (!token) {
      toast({
        title: "Token required",
        variant: "destructive"
      })
      return;
    }

    try {
      mapboxgl.accessToken = token;

      const bounds: [number, number, number, number] = [
        9.101499,
        47.421499, // Southwest longitude, latitude
        9.179719,
        47.461404, // Northeast longitude, latitude
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

        points.forEach((point) => {
          const el = document.createElement("div");
          el.className = "marker " + point.status;
          el.style.height = "15px"; // Increase the size
          el.style.width = "15px"; // Increase the size
          el.style.borderRadius = "50%";
          el.style.position = "relative";
          el.style.boxShadow = `0px 0px 4px 2px ${getStatusShadowColor(
            point.status
          )}`;
          el.style.transform = "translate(-50%, -50%)"; // Center the marker
          el.style.cursor = "pointer";

          const invisibleBox = document.createElement("div");
          invisibleBox.style.position = "absolute";
          invisibleBox.style.top = "-10px";
          invisibleBox.style.left = "-10px";
          invisibleBox.style.height = "30px";
          invisibleBox.style.width = "30px";
          invisibleBox.style.opacity = "0";
          invisibleBox.style.cursor = "pointer";

          const markerContainer = document.createElement("div");
          markerContainer.className = "flex items-center";
          markerContainer.style.position = "absolute";
          markerContainer.appendChild(el);
          markerContainer.appendChild(invisibleBox);

          new mapboxgl.Marker(markerContainer)
            .setLngLat(point.coordinates)
            .addTo(map.current!);

          markerContainer.addEventListener("click", () => {
            onFocusChange(point);
            setActivePoint(point);
          });
        });

        // Handle overall map click to reset active point
        map.current?.on("click", (e) => {
          if (!e.defaultPrevented) {
            onFocusChange(null);
            setActivePoint(null);
          }
        });

        setMapStatus("success");

      });
    } catch (err:any) {
      toast({
        title: err,
        variant: "destructive"
      })
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [tilesetId, points]);

  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      {mapStatus === "loading" && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-lg"></div>
      )}
      <div
        ref={mapContainer}
        className={`w-full h-full overflow-hidden rounded-lg ${
          mapStatus === "loading" ? "invisible" : "visible"
        }`}
      />
    </div>
  );
}
