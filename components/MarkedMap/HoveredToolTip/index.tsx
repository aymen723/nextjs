import React, { ReactNode } from "react";
import { Tooltip } from "react-leaflet";

type Props = {
  children?: ReactNode;
};

const HoveredToolTip = ({ children }: Props) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip interactive className="p-0 border-0" permanent={hovered}>
        {children}
      </Tooltip>
    </div>
  );
};

export default HoveredToolTip;
