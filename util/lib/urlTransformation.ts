import { GeoCoordinates } from "@/types/geoTypes";

export const getGoogleMapURL = (coordinates: GeoCoordinates) => {
  return `www.google.com/map?q=${coordinates.y},${coordinates.x}`;
};
