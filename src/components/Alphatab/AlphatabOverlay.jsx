import React, { useLayoutEffect, useState } from "react";
import { collectAlphaTabComponents } from "./alphatabHelpers";
import OverlayUnit from "./OverlayUnit.jsx";

const FilterTypes = {
  TRACK: "track",
  HIGHLIGHT: "highlight",
};

const AlphatabOverlay = ({ boundsLookup, click, ...filters }) => {
  const [guides, setGuides] = useState([]);

  const filterRunner = (guide, filterType) => {
    const filter = filters[`${filterType}${guide.type}`];

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
      {guides
        .filter((guide) => filterRunner(guide, FilterTypes.TRACK))
        .map((guide, index) => (
          <OverlayUnit
            key={index}
            bounds={guide.bounds}
            isVisible={() => filterRunner(guide, FilterTypes.HIGHLIGHT)}
            click={() => click(guide)}
          />
        ))}
    </div>
  );
};

export default React.memo(AlphatabOverlay);
