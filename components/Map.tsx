"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";

interface Property {
    id: string;
    title: string;
    price: number;
    [key: string]: unknown;
}

interface MapProps {
    properties: Property[];
    highlightedId: string | null;
    simple?: boolean;
}

// Mock coordinates for Metropolis (New York-ish)
const CENTER: [number, number] = [40.7128, -74.0060];

export const PROPERTY_COORDINATES: Record<string, [number, number]> = {
    "1": [40.7128, -74.0060], // Downtown
    "2": [40.7064, -74.0094], // Financial District
    "3": [40.7209, -74.0007], // Arts District (SoHo-ish)
    "4": [40.7831, -73.9712], // Uptown
    "5": [40.7589, -73.9851], // Tech Hub (Times Square-ish)
    "6": [40.7308, -74.0025], // Old Town (Village)
    "7": [40.7453, -73.9936], // Residential apartment
};

export default function Map({ properties, highlightedId, simple = false }: MapProps) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsReady(true));

        return () => cancelAnimationFrame(frame);
    }, []);

    if (!isReady) {
        return (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-(--color-ink)">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
            </div>
        );
    }

    const center = properties.length === 1 ? PROPERTY_COORDINATES[properties[0].id] || CENTER : CENTER;
    const zoom = properties.length === 1 ? 15 : 13;

    return (
        <MapContainer
            key="urban-stay-map"
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            className="h-full w-full rounded-xl"
            style={{ background: simple ? "#E8EBED" : "#0E1A3C" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url={simple ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"}
            />

            {properties.map((property) => (
                <MapMarker
                    key={property.id}
                    property={property}
                    isHighlighted={highlightedId === property.id}
                    simple={simple}
                />
            ))}
        </MapContainer>
    );
}

// Extract Marker to a separate component to handle icon memoization
function MapMarker({ property, isHighlighted, simple }: { property: Property, isHighlighted: boolean, simple: boolean }) {
    const position = PROPERTY_COORDINATES[property.id] || CENTER;

    // Memoize the icon to prevent recreation on every render
    const customIcon = useMemo(() => {
        return L.divIcon({
            className: "custom-pin",
            html: `<div style="
                background-color: ${isHighlighted ? '#C9A84C' : '#1B2B5E'};
                width: ${simple || isHighlighted ? '30px' : '24px'};
                height: ${simple || isHighlighted ? '30px' : '24px'};
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 8px 18px rgba(27,43,94,0.18);
                transition: all 0.3s ease;
            "></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
    }, [isHighlighted, simple]);

    return (
        <Marker position={position} icon={customIcon}>
            <Popup className="custom-popup">
                <div className="flex flex-col gap-2 p-1">
                    <span className="font-bold text-(--color-ink)">{property.title}</span>
                    <span className="font-medium text-(--color-primary)">
                        ${property.price} / night
                    </span>
                </div>
            </Popup>
        </Marker>
    );
}
