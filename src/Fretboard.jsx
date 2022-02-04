import { Fretboard } from "@moonwave99/fretboard.js";
import { useEffect, useRef, useState } from "react";
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
const options = { tom: 10 };
const CLICK_TIMEOUT = 150;
let lastClick = false;
const FretboardJSX = ({ dots, setDots }) => {
  const figureRef = useRef(null);

  const fretboard = useFretboard(figureRef, options);
  useEffect(() => {
    console.log("ouch");
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
          setDots({ string, fret, type: DOTS_ACTIONS.REMOVE });
          lastClick = false;
          return;
        }

        lastClick = setTimeout(() => {
          setDots({ dot: position, type: DOTS_ACTIONS.ADD });
          lastClick = false;
        }, CLICK_TIMEOUT);
      });
    } catch (error) {}
  }, [fretboard]);

  useEffect(() => {
    fretboard.setDots(dots).render();
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
