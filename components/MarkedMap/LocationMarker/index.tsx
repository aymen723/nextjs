"use client";
import { getZoomByRange } from "@/components/market/pages/map/StockMap/utils/getZoomByRange";
import { LatLng, LocationEvent } from "leaflet";
import React from "react";
import { Circle, Marker, Popup, useMapEvents } from "react-leaflet";
import { ErrorEvent } from "leaflet";
import { GeoCoordinates } from "@/types/geoTypes";

export type LocationMarkerProps = {
  show?: boolean;
  circle?: {
    color?: string;
  };
  popUp?: React.ReactNode;
  position?: GeoCoordinates | null;
  range: number;
};

export function LocationMarker({
  show = true,
  circle,
  position: providedPosition,
  popUp,
  range,
}: LocationMarkerProps) {
  const [showCircle, setShowCircle] = React.useState(true);

  const position = React.useMemo(() => {
    if (providedPosition) {
      return new LatLng(providedPosition.y, providedPosition.x);
    }
  }, [providedPosition]);
  const map = useMapEvents({
    move: () => {
      setShowCircle(false);
    },
    moveend: () => {
      setShowCircle(true);
    },
  });

  React.useEffect(() => {}, [circle]);

  const displayLocation = position !== undefined && show;

  return !displayLocation ? null : (
    <>
      <Marker position={position} zIndexOffset={-1}>
        {popUp && <Popup>{popUp}</Popup>}
      </Marker>
      {circle && showCircle && <Circle center={position} radius={range} />}
    </>
  );
}

export default LocationMarker;
