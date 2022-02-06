import { AlphaTabApi, Settings } from "@coderline/alphatab";
import { useEffect, useRef, useState } from "react";
import { useBeats } from "../Beats.jsx";
import AlphatabOverlay from "./AlphatabOverlay.jsx";

function dotsToAlphaTex(dots) {
  if (!dots.length)
    return `
\\tempo 90
.`;

  return dots
    .filter((dot) => !dot.moving)
    .reduce((str, dot) => {
      return (str += ` ${dot.fret}.${dot.string}`);
    }, ":4");
}

function beatsToAlphatex(beats) {
  if (!beats.length)
    return `
\\tempo 90
.`;

  const notes = beats
    .map((beat) => {
      const size = beat.notes.size();
      if (size === 0) {
        return "";
      } else {
        return `(${beat.notes.immutable.map((note) => note.tex).join(" ")})`;
      }
    })
    .join(" ");

  return `
.
:4 ${notes}`;
}

const Alphatab = ({ children, dots }) => {
  const alphaTabRef = useRef(null);
  const {
    state: { currentBeat, beats },
  } = useBeats();
  const [alphaTab, setAlphaTab] = useState(() => {});
  const [boundsLookup, setBoundsLookup] = useState(() => {});

  const updateAlphaTab = (tex) => {
    alphaTab.tex(tex);
  };

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
          setBoundsLookup(alphaTab.renderer.boundsLookup);
        }
      });

      // updateAlphaTab(beatsToAlphatex(beats));
    }
  }, [alphaTab]);

  useEffect(() => {
    if (alphaTab) {
      updateAlphaTab(beatsToAlphatex(beats));
      // console.log(beatsToAlphatex(beats));
      // console.log("hiyo");
    }
  }, [beats]);

  useEffect(() => {
    // console.log("beats", beats);
  }, [beats]);

  const filterBeat = (guide) => {
    // !!guide.component.beat.notes.length
    if (guide && guide.component.beat.index === currentBeat) {
      return true;
    }
  };

  return (
    <div>
      <div className="relative" ref={alphaTabRef}>
        <AlphatabOverlay
          boundsLookup={boundsLookup}
          isVisible
          showStaveGroups={false}
          showMasterBars={false}
          showBars={false}
          showBeats={(...args) => filterBeat(...args)}
          showNotes={false}
        />
      </div>
    </div>
  );
};

export default Alphatab;
