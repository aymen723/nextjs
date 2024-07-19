"use client";
import React, { ReactNode } from "react";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
  Circle,
  CircleMarker,
  Tooltip,
  useMapEvents,
  useMap,
} from "react-leaflet";

import {
  DivIcon,
  ErrorEvent,
  Icon,
  IconOptions,
  LatLng,
  LeafletEventHandlerFnMap,
  LocationEvent,
  Map,
  Marker as MarkerClass,
  PathOptions,
  Point,
} from "leaflet";

import marker from "@/assets/svgs/pharmacy-marker.svg";
import Smarker from "@/assets/svgs/pharmacy-selected-marker.svg";
import HoveredToolTip from "./HoveredToolTip";
import { GeoCoordinates } from "@/types/geoTypes";
import { PharmacyRespData } from "@/client/types/responses/StockResponses";
import { getZoomByRange } from "../market/pages/map/StockMap/utils/getZoomByRange";
import LocationMarker, { LocationMarkerProps } from "./LocationMarker";

export type PopupDefiner = {
  render?: ReactNode;
};

export type TooltipDefiner = {
  render?: ReactNode;
};

// export type MarkerDefiner = {
//   key: string | number;

//   location: {
//     x: number;
//     y: number;
//   };
//   popup?: PopupDefiner;
//   tooltip?: TooltipDefiner;
//   eventHandlers?: LeafletEventHandlerFnMap;
//   isSelected?: boolean;
//   title?: string;
// };

export type CircleDefiner = {
  key: string | number;
  location: {
    x: number;
    y: number;
  };
  radius: number;
  pathOptions?: PathOptions;
};

export type PharmacyMarker = {
  data: PharmacyRespData;
  toolTip?: React.ReactNode;
  showPopUp?: boolean;
  eventHandlers?: LeafletEventHandlerFnMap;
  isSelected: boolean;
};

type Props = {
  containerProps?: MapContainerProps;
  display?: {
    circles?: CircleDefiner[];
    pharmacyMarkers?: PharmacyMarker[];
    userLocation?: LocationMarkerProps;
  };
  onMapLoad: (map: Map) => void;
};

const PIcon = new Icon({
  iconUrl: marker.src,
  iconRetinaUrl: marker.src,

  iconSize: new Point(28, 28),
  iconAnchor: [15, 29],
});

const SelectedPIcon = new Icon({
  iconUrl: Smarker.src,
  iconRetinaUrl: Smarker.src,

  iconSize: new Point(28, 28),
  iconAnchor: [15, 29],
});

const MapSetter = ({ onMapLoad }: { onMapLoad: (map: Map) => void }) => {
  const map = useMap();
  React.useEffect(() => {
    onMapLoad(map);
  }, [map]);
  return null;
};

const MarkedMap = ({ containerProps, display, onMapLoad }: Props) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <MapContainer attributionControl={false} minZoom={2} {...containerProps}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapSetter onMapLoad={onMapLoad} />
      <div>
        {/* {display?.markers?.map((markerData) => {
          const sensitive: SensitiveMarkerInfo = {};
          if (markerData.icon === "pharmacy") {
            sensitive.icon = PIcon;
          }
          return (
            <Marker
              key={markerData.key}
              eventHandlers={markerData.eventHandlers}
              position={{
                lat: markerData.location.y,
                lng: markerData.location.x,
              }}
              {...sensitive}
              zIndexOffset={markerData.isSelected ? 10 : 0}
              title={markerData.title}
            >
              {!!markerData.popup && <Popup>{markerData.popup.render}</Popup>}
              {!!markerData.tooltip && (
                <HoveredToolTip>{markerData.tooltip.render}</HoveredToolTip>
              )}
            </Marker>
          );
        })} */}

        {display?.userLocation && <LocationMarker {...display.userLocation} />}

        {display?.pharmacyMarkers?.map((phMarker) => {
          const pharmacy = phMarker.data;
          const position = {
            lat: pharmacy.location.coordinates.y,
            lng: pharmacy.location.coordinates.x,
          };
          return (
            <Marker
              position={position}
              key={pharmacy.id}
              icon={phMarker.isSelected ? SelectedPIcon : PIcon}
              eventHandlers={phMarker.eventHandlers ?? {}}
              zIndexOffset={phMarker.isSelected ? 20 : 10}
            ></Marker>
          );
        })}
      </div>

      {display?.circles?.map((circleData) => {
        return (
          <Circle
            key={circleData.key}
            // eventHandlers={{}}

            center={{
              lat: circleData.location.y,
              lng: circleData.location.x,
            }}
            radius={circleData.radius}
            pathOptions={circleData.pathOptions}
          ></Circle>
        );
      })}
    </MapContainer>
  );
};

export default MarkedMap;
