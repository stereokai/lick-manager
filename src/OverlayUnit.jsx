import React, { useEffect, useState } from 'react';

const GuideType = {
  VisualBounds: 0,
  RealBounds: 1,
};

const GuideElements = {
  StaveGroups: 0,
  MasterBars: 1,
  Bars: 2,
  Beats: 3,
  Notes: 4,
};

const OverlayUnit = ({bounds, type }) => {
  const [style, setStyle] = useState();
  useEffect(() => {
    setStyle(() => {
      // const rect =  "x" in bounds ?
      //   bounds : type === GuideType.VisualBounds ?
      //     bounds.visualBounds : bounds.realBounds
      if (!bounds) return;
      return {
        left: bounds.x + "px",
        top: bounds.y + "px",
        width: bounds.w + "px",
        height: bounds.h + "px",
      }
    });
  }, [bounds])

  return (
    <div
      // ref={overlayUnitRef}
      style={style}
      className="absolute border-solid border-1 border-orange-500 bg-orange-300"
     />
  );
};

export default OverlayUnit;
