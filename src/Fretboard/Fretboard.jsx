import { Fretboard } from "@moonwave99/fretboard.js";
import { useEffect, useRef, useState } from "react";
import { useBeats } from "../Beats.jsx";
import { DOTS_ACTIONS } from "./dotsReducer.jsx";
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
const FretboardJSX = ({ dots, setDots }) => {
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

  return <figure style={{ width: "100%" }} ref={figureRef} />;
};

export { FretboardJSX as Fretboard };
