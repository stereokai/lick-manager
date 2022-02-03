import React, { useEffect, useState } from 'react';
import OverlayUnit from './OverlayUnit';
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




const AlphatabOverlay = ({boundsLookup, showStaveGroups, showMasterBars, showBars, showBeats, showNotes }) => {
  // const alphaOverlayRef = useRef(null);
  const lookupRelationships = [
    { container: 'staveGroups', filter: type => type == 0 && showStaveGroups },
    { container: 'bars', filter: type => type == 1 && showMasterBars },
    { container: 'bars', filter: type => type == 2 && showBars },
    { container: 'beats', filter: type => type == 3 && showBeats },
    { container: 'notes', filter: type => type == 4 && showNotes },
  ]

  function createGuide(guides, container, level) {
    let index = 0;
    if (level < lookupRelationships.length) {
      const nextContainer = container[lookupRelationships[level].container];

      if (nextContainer) {
        for (const member of nextContainer) {
          console.log(level, (lookupRelationships[level - 1] && lookupRelationships[level - 1].container) || 'lookup', lookupRelationships[level].container, container, nextContainer, member)
          // ignore duplicates (AlphaTab bug)
          if (index && member.index <= index) {
            console.log('continue')
            continue;
          }
          index++
          guides.push({
            index: member.index,
            id: member.id,
            bounds: member.visualBounds || member.noteHeadBounds,
            type: level
          })

          createGuide(guides, member, level + 1)
        }
      }
    }
  }

  const [guides, setGuides] = useState([]);



  useEffect(() => {
    const list = []
    if (boundsLookup)
    createGuide(list, boundsLookup, 0)
    console.log(list)
    setGuides(list.filter(item => lookupRelationships[item.type].filter(item.type)))
  }, [boundsLookup])


  return (
    <div
      // ref={alphaOverlayRef}
      className="absolute z-50 inset-0 opacity-30">
        {/* {JSON.stringify(guides)} */}
        {guides.map((guide, index) => (

            <OverlayUnit key={index} bounds={guide.bounds} />

        ))}

    </div>
  );
}

export default AlphatabOverlay