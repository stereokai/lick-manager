import { AlphaTabApi, Settings } from "@coderline/alphatab";
import React, { useEffect, useRef, useState } from "react";
import AlphatabOverlay from "./AlphatabOverlay";

function dotsToAlphaTex(dots) {
  if (!dots.length) return `
\\tempo 90
.`;

  return dots
    .filter(dot => !dot.moving)
    .reduce((str, dot) => {
      return str += ` ${dot.fret}.${dot.string}`
  }, ':4')
}

const BoundsLookupViewer = ({children, dots}) => {
  const alphaTabRef = useRef(null);


  const [alphaTab, setAlphaTab] = useState(() => {});
  const [boundsLookup, setBoundsLookup] = useState(() => {});
  useEffect(() => {
      const el = alphaTabRef.current;
      if (!el) {
        return;
      }
      const settings = new Settings()
      settings.display.staveProfile = 3;
      // const alphaTab = ;
      if (alphaTab) {
        alphaTab.destroy();
        console.log('dest1')
      }
      setAlphaTab(new AlphaTabApi(el, Object.assign(settings, {})));
      console.log('build')

      return () => {
          // alphaTab.removeEventListeners();
          alphaTab.destroy();
          console.log('dest2')
          // el && Array.from(el.children).forEach((child) => child.remove());
      };
  }, [alphaTabRef]);


  useEffect(() => {
    console.log('ap')
    if (alphaTab) {
      alphaTab.postRenderFinished.on(() => {
        if (alphaTab.renderer.boundsLookup) {
          setBoundsLookup(alphaTab.renderer.boundsLookup)
      }});
      // alphaTab.render();
      window.apt = alphaTab;
    }
  }, [alphaTab])


  useEffect(() => {
    if (alphaTab) {
      alphaTab.tex(dotsToAlphaTex(dots))
    }
  }, [JSON.stringify(dots.filter(dot => !dot.moving))])

    return (
      <div>
        <div className="relative"
          ref={alphaTabRef}
        >
          <AlphatabOverlay
            boundsLookup={boundsLookup}
            showStaveGroups={false}
            showMasterBars={false}
            showBars={false}
            showBeats={true}
            showNotes={false}
          />
        </div>
      </div>
    );
  }

  export default BoundsLookupViewer