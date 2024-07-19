import { GeoCoordinates } from "@/types/geoTypes";

export const getGeolocation = (): Promise<GeoCoordinates> => {
  const promise = new Promise<GeoCoordinates>((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          resolve({
            x: location.coords.longitude,
            y: location.coords.latitude,
          });
        },
        (err) => {
          reject(err);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 1000 * 60,
        }
      );
    } else {
      reject();
    }
  });

  return promise;
};
