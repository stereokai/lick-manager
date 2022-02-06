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

  const res = beats.reduce((str, beat) => {
    return (
      str +
      ` (${[...beat.notes].reduce((str, noteStr) => {
        const note = noteStr.split(":");
        return (str += ` ${note[0]}.${note[1]}`);
      }, "")})`
    );
  }, ":4");

  console.log("tex:", res);
  return res;
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

      updateAlphaTab(beatsToAlphatex(beats));
    }
  }, [alphaTab]);

  useEffect(() => {
    if (alphaTab) {
      updateAlphaTab(beatsToAlphatex(beats));
    }
  }, [beats]);

  useEffect(() => {
    console.log(beats);
  }, [beats]);

  return (
    <div>
      <div className="relative" ref={alphaTabRef}>
        <AlphatabOverlay
          boundsLookup={boundsLookup}
          isVisible
          showStaveGroups={false}
          showMasterBars={false}
          showBars={false}
          showBeats
          showNotes={false}
        />
      </div>
    </div>
  );
};

export default Alphatab;
