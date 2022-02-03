import React, { useEffect, useState } from 'react';
import { BEATS_TYPE, collectAlphaTabComponents } from './helpers';
import OverlayUnit from './OverlayUnit';

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

const AlphatabOverlay = ({boundsLookup, ...filters }) => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (boundsLookup) {
      setGuides([...collectAlphaTabComponents(boundsLookup, 0)]) }
  }, [boundsLookup])

  useEffect(() => {
    // console.log('guides', guides.map(guide => guide.member))
  }, [JSON.stringify(guides, getCircularReplacer())])

  return (
    <div className="absolute z-50 inset-0 opacity-30">
      {guides
        .filter(guide => !!filters[`show${guide.type}`])
        .filter(guide => {
          console.log('test', guide.type, BEATS_TYPE, !!guide.member.beat.notes, !!guide.member.beat.notes.length)
          return guide.type != BEATS_TYPE || !!guide.member.beat.notes.length
        })
        .map((guide, index) => (
          <OverlayUnit key={index} bounds={guide.bounds} />
        ))}
    </div>
  );
}

export default AlphatabOverlay