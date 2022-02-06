import React, { useLayoutEffect, useState } from "react";
import { collectAlphaTabComponents } from "./AlphatabHelpers";
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

  const filterGuide = (guide) => {
    const filter = filters[`show${guide.type}`];

    if (typeof filter === "function") {
      return filter(guide);
    }

    return !!filter;
  };

  useLayoutEffect(() => {
    if (boundsLookup) {
      setGuides([...collectAlphaTabComponents(boundsLookup, 0)]);
    }
  }, [boundsLookup]);

  return (
    <div className="absolute z-50 inset-0 opacity-30">
      {guides.filter(filterGuide).map((guide, index) => (
        <OverlayUnit key={index} bounds={guide.bounds} isVisible={isVisible} />
      ))}
    </div>
  );
};

export default React.memo(AlphatabOverlay);
