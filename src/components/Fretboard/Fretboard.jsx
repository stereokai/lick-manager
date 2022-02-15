import { BeatsActions, useBeats } from "@/routes/Beats.jsx";
import { Fretboard as FretboardJS } from "@moonwave99/fretboard.js";
import { useEffect, useReducer, useRef, useState } from "react";
import { DotsActions, dotsReducer } from "./dotsReducer.jsx";
import { dedupeNotes } from "./fretboardHelpers.jsx";

const useFretboard = (figureRef, opts = {}) => {
  const [fretboard, setFretboard] = useState();

  useEffect(() => {
    const el = figureRef.current;
    if (!el) {
      return;
    }

    const fretboard = new FretboardJS(Object.assign(opts, { el }));
    setFretboard(fretboard);

    return () => {
      fretboard.removeEventListeners();
      fretboard.clear();
      el && Array.from(el.children).forEach((child) => child.remove());
    };
  }, [figureRef]);

  return fretboard;
};

export const FretboardInteractive = () => {
  const [dots, setDots] = useReducer(dotsReducer, []);
  const figureRef = useRef(null);
  const {
    dispatch,
    state: { beats, currentBeat },
  } = useBeats();

  const fretboard = useFretboard(figureRef, {
    dotStrokeColor: ({ moving }) => (moving ? "red" : "black"),
  });

  useEffect(() => {
    if (!fretboard) return;

    const CLICK_TIMEOUT = 150;
    let lastClick = false;

    fretboard.render();

    fretboard.on("mousemove", (position) => {
      setDots({ dot: position, type: DotsActions.HOVER });
    });
    fretboard.on("mouseleave", () => {
      setDots({ type: DotsActions.CLEAR_HOVER });
    });
    fretboard.on("click", (position) => {
      if (lastClick) {
        clearTimeout(lastClick);
        // setDots({ string, fret, type: DotsActions.REMOVE });
        dispatch({
          type: BeatsActions.REMOVE_NOTE_FROM_CURRENT_BEAT,
          note: position,
        });
        lastClick = false;
        return;
      }

      lastClick = setTimeout(() => {
        // setDots({ dot: position, type: DotsActions.ADD });
        dispatch({
          type: BeatsActions.ADD_NOTE_TO_BEAT,
          note: position,
        });
        lastClick = false;
      }, CLICK_TIMEOUT);
    });

    window.fb = fretboard;
  }, [fretboard]);

  useEffect(() => {
    if (!fretboard) return;

    fretboard
      .setDots([...dedupeNotes(beats), ...dots])
      .render()
      .style({
        filter: (dot) => {
          if (dot.beats) {
            return dot.beats.has(currentBeat);
          }
        },
        fill: "blue",
      });
  }, [fretboard, dots, beats, currentBeat]);

  return <figure style={{ width: "100%" }} ref={figureRef} />;
};

export const Fretboard = ({ beats }) => {
  const figureRef = useRef(null);
  const fretboard = useFretboard(figureRef);

  useEffect(() => {
    if (fretboard && beats && beats.length) {
      fretboard.setDots(dedupeNotes(beats)).render();
    }
  }, [beats, fretboard]);

  return <figure style={{ width: "100%" }} ref={figureRef} />;
};
