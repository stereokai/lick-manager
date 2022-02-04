import { useEffect, useState } from "react";

const OverlayUnit = ({ bounds, isVisible }) => {
  const [style, setStyle] = useState();
  useEffect(() => {
    setStyle(() => {
      if (!bounds) return;
      return {
        left: bounds.x + "px",
        top: bounds.y + "px",
        width: bounds.w + "px",
        height: bounds.h + "px",
      };
    });
  }, [bounds]);

  return (
    <div
      // ref={overlayUnitRef}
      style={style}
      className={`absolute ${
        isVisible ? "border-solid border-1 border-orange-500 bg-orange-300" : ""
      }`}
    />
  );
};

export default OverlayUnit;
