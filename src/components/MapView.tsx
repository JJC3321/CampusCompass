"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Resource, CATEGORY_COLORS } from "@/types";

interface MapViewProps {
  readonly resources: readonly Resource[];
  readonly center: [number, number];
  readonly zoom?: number;
}

function createCategoryIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "custom-marker",
    html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.9"/>
    </svg>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

const ICONS: Record<string, L.DivIcon> = {
  scholarships: createCategoryIcon(CATEGORY_COLORS.scholarships),
  "mental-health": createCategoryIcon(CATEGORY_COLORS["mental-health"]),
  learning: createCategoryIcon(CATEGORY_COLORS.learning),
};

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapView({
  resources,
  center,
  zoom = 14,
}: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-xl"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={center} />
      {resources.map((resource) => (
        <Marker
          key={resource.id}
          position={[resource.lat, resource.lng]}
          icon={ICONS[resource.category]}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="mb-1 text-sm font-semibold text-slate-900">
                {resource.title}
              </h3>
              <span
                className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                style={{
                  backgroundColor: CATEGORY_COLORS[resource.category],
                }}
              >
                {resource.category === "scholarships"
                  ? "Scholarship"
                  : resource.category === "mental-health"
                    ? "Wellness"
                    : "Learning"}
              </span>
              <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-medium text-scholarship hover:underline"
              >
                Learn More &rarr;
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
