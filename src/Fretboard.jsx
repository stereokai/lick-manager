import { Fretboard } from "@moonwave99/fretboard.js";
import { useEffect, useRef, useState } from "react";
import { useBeats } from "./Beats.jsx";
import { DOTS_ACTIONS } from "./dotsReducer.jsx";

const useFretboard = (figureRef, opts) => {
  const [fretboard, setFretboard] = useState(() => new Fretboard());
  useEffect(() => {
    const el = figureRef.current;
    if (!el) {
      return;
    }

    const fretboard = new Fretboard(Object.assign(opts, { el: el }));
    setFretboard(fretboard);
    fretboard.render();
    return () => {
      fretboard.removeEventListeners();
      fretboard.clear();
      el && Array.from(el.children).forEach((child) => child.remove());
    };
  }, [figureRef, opts]);
  return fretboard;
};

function concatSets(...iterables) {
  const set = new Set();
  for (const iterable of iterables) {
    for (const item of iterable) {
      set.add(item);
    }
  }

  return set;
}

function dedupeNotes(beats) {
  if (!beats.length) return [];

  const set = concatSets(...beats.map((beat) => beat.notes));
  return [...set].map((noteStr) => {
    const note = noteStr.split(":");
    return { fret: note[0], string: note[1] };
  });
}

const options = { tom: 10 };
const CLICK_TIMEOUT = 150;
let lastClick = false;
const FretboardJSX = ({ dots, setDots }) => {
  const figureRef = useRef(null);
  const {
    dispatch,
    state: { beats },
  } = useBeats();
  const fretboard = useFretboard(figureRef, options);
  useEffect(() => {
    try {
      fretboard.on("mousemove", (position) => {
        setDots({ dot: position, type: DOTS_ACTIONS.HOVER });
      });
      fretboard.on("mouseleave", () => {
        setDots({ type: DOTS_ACTIONS.CLEAR_HOVER });
      });
      // fretboard.on("dblclick", ({ string, fret }) => {
      //   setDots({ string, fret, type: 'removeDot' });
      // });
      fretboard.on("click", (position) => {
        if (lastClick) {
          const { string, fret } = position;
          clearTimeout(lastClick);
          // setDots({ string, fret, type: DOTS_ACTIONS.REMOVE });
          dispatch({ type: "REMOVE_NOTE", note: position });
          lastClick = false;
          return;
        }

        lastClick = setTimeout(() => {
          // setDots({ dot: position, type: DOTS_ACTIONS.ADD });
          dispatch({ type: "ADD_NOTE", note: position });
          lastClick = false;
        }, CLICK_TIMEOUT);
      });
    } catch (error) {}
  }, [fretboard]);

  useEffect(() => {
    fretboard.setDots([...dots, ...dedupeNotes(beats)]).render();
  }, [dots]);

  // useEffect(() => {
  //   const el = figureRef.current;
  //   if (!el) {
  //     return;
  //   }
  // },  [figureRef])

  // fretboard.render()

  return <figure style={{ width: "100%" }} ref={figureRef} />;
};

export { FretboardJSX as Fretboard };
