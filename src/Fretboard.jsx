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
  }, [figureRef]);
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
  function set(k, v) {
    allNotes.set(k, v);
    return allNotes.get(k);
  }
  const allNotes = new Map();
  for (let i = 0; i < beats.length; i++) {
    const notes = beats[i].notes;

    for (const note of notes) {
      const savedNote = allNotes.get(note.tex) || set(note.tex, note.immutable);
      savedNote.beats.add(i);
    }
  }

  // console.log("res", allNotes);
  return Array.from(allNotes.values());
}

const CLICK_TIMEOUT = 150;
let lastClick = false;
const FretboardJSX = ({ dots, setDots }) => {
  const figureRef = useRef(null);
  const {
    dispatch,
    state: { beats, currentBeat },
  } = useBeats();

  const fretboard = useFretboard(figureRef, {});
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
  }, [dots, beats, currentBeat]);

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
