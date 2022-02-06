import { AlphaTabApi, Settings } from "@coderline/alphatab";
import { useEffect, useRef, useState } from "react";
import { BeatsActions, useBeats } from "../Beats.jsx";
import { beatsToAlphatex } from "./alphatabHelpers.js";
import AlphatabOverlay from "./AlphatabOverlay.jsx";

const Alphatab = ({ children, dots }) => {
  const alphaTabRef = useRef(null);
  const {
    dispatch,
    state: { currentBeat, beats },
  } = useBeats();
  const [alphaTab, setAlphaTab] = useState(() => {});
  const [boundsLookup, setBoundsLookup] = useState(() => {});

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
    }
  }, [alphaTab]);

  useEffect(() => {
    if (alphaTab) {
      alphaTab.tex(beatsToAlphatex(beats));
    }
  }, [beats]);

  const clickHandler = ({ component: { beat } }) => {
    dispatch({ type: BeatsActions.SET_CURRENT_BEAT, beat: beat.index });
  };

  return (
    <div>
      <div className="relative" ref={alphaTabRef}>
        <AlphatabOverlay
          boundsLookup={boundsLookup}
          click={(guide) => clickHandler(guide)}
          trackStaveGroups={false}
          trackMasterBars={false}
          trackBars={false}
          trackBeats
          trackNotes={false}
          highlightBeats={({ component: { beat } }) =>
            beat.index === currentBeat
          }
        />
      </div>
    </div>
  );
};

export default Alphatab;
