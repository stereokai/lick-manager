import { Fretboard } from "@moonwave99/fretboard.js";
import { useEffect, useReducer, useRef, useState } from "react";
import { BeatsActions, useBeats } from "../../Beats.jsx";
import { DotsActions, dotsReducer } from "./dotsReducer.jsx";
import { dedupeNotes } from "./fretboardHelpers.jsx";

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

const CLICK_TIMEOUT = 150;
let lastClick = false;
const FretboardJSX = () => {
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
    try {
      fretboard.on("mousemove", (position) => {
        setDots({ dot: position, type: DotsActions.HOVER });
      });
      fretboard.on("mouseleave", () => {
        setDots({ type: DotsActions.CLEAR_HOVER });
      });
      // fretboard.on("dblclick", ({ string, fret }) => {
      //   setDots({ string, fret, type: 'removeDot' });
      // });
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
            type: BeatsActions.ADD_NOTE_TO_CURRENT_BEAT,
            note: position,
          });
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

  return <figure style={{ width: "100%" }} ref={figureRef} />;
};

export { FretboardJSX as Fretboard };
