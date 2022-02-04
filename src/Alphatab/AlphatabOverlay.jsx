import React, { useLayoutEffect, useState } from "react";
import { BEATS_TYPE, collectAlphaTabComponents } from "./AlphatabHelpers";
import OverlayUnit from "./OverlayUnit.jsx";

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const AlphatabOverlay = ({ boundsLookup, isVisible, ...filters }) => {
  const [guides, setGuides] = useState([]);

  useLayoutEffect(() => {
    if (boundsLookup) {
      setGuides([...collectAlphaTabComponents(boundsLookup, 0)]);
    }
  }, [boundsLookup]);

  return (
    <div className="absolute z-50 inset-0 opacity-30">
      {guides
        .filter((guide) => !!filters[`show${guide.type}`])
        .filter((guide) => {
          return (
            guide.type !== BEATS_TYPE || !!guide.component.beat.notes.length
          ); // don't show guide for empty beats
        })
        .map((guide, index) => (
          <OverlayUnit
            key={index}
            bounds={guide.bounds}
            isVisible={isVisible}
          />
        ))}
    </div>
  );
};

export default React.memo(AlphatabOverlay);
