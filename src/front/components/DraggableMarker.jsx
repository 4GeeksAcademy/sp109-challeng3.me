import React, { useRef, useMemo } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

function ClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })
  return null
}

const DraggableMarker = ({ position, setPosition }) => {
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const latlng = marker.getLatLng();
                    setPosition([latlng.lat, latlng.lng]);
                }
            }
        }),
        [setPosition]
    );

    const isValidPosition =
        Array.isArray(position) &&
        position.length === 2 &&
        !isNaN(position[0]) &&
        !isNaN(position[1])

    if (!isValidPosition) return null

    return (
        <>
            <ClickHandler setPosition={setPosition} />
            <Marker
                draggable
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}
                icon={L.icon({
                    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                })}
            >
                <Popup>Mueve el marcador para elegir ubicación</Popup>
            </Marker>
        </>
    );
};

export default DraggableMarker;