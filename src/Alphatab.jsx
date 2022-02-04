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

const Alphatab = ({children, dots}) => {
  const alphaTabRef = useRef(null);
  const [alphaTab, setAlphaTab] = useState(() => {});
  const [boundsLookup, setBoundsLookup] = useState(() => {});

  const updateAlphaTab = (tex) => {
    alphaTab.tex(tex)
  }

  useEffect(() => {
      const el = alphaTabRef.current;
      const settings = new Settings();

      settings.display.staveProfile = 3;
      if (alphaTab) {
        alphaTab.destroy();
      }

      setAlphaTab(new AlphaTabApi(el, Object.assign(settings, {})));

      return () => {
        if (alphaTab) {
          alphaTab.destroy();
        }
      };
  }, [alphaTabRef]);


  useEffect(() => {
    if (alphaTab) {
      alphaTab.postRenderFinished.on(() => {
        if (alphaTab.renderer.boundsLookup) {
          setBoundsLookup(alphaTab.renderer.boundsLookup)
        }
      });

      updateAlphaTab(dotsToAlphaTex(dots))
    }
  }, [alphaTab])

  useEffect(() => {
    if (alphaTab) {
      updateAlphaTab(dotsToAlphaTex(dots))
    }
  }, [JSON.stringify(dots)])

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
            showBeats
            showNotes={false}
          />
        </div>
      </div>
    );
  }

  export default Alphatab