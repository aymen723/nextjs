import { GeoCoordinates } from "@/types/geoTypes";
import { getGeolocation } from "@/util/lib/geolocation";
import { useRouter } from "next/router";
import React from "react";
type Props = {
  render: (isLocating: boolean) => React.ReactNode;
  onLocate: (location: GeoCoordinates) => void;
  onLocateFail?: () => void;
};
const Localiser = ({ render, onLocate, onLocateFail }: Props) => {
  const [isLocating, setIsLocating] = React.useState(false);

  return (
    <span
      className=""
      onClick={() => {
        if (!isLocating) {
          setIsLocating(true);
          getGeolocation()
            .then((location) => onLocate(location))
            .catch(() => {
              onLocateFail?.();
            })
            .finally(() => {
              setIsLocating(false);
            });
        }
      }}
      role="button"
    >
      {render(isLocating)}
    </span>
  );
};

export default Localiser;
