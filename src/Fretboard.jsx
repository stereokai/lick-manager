import { Fretboard } from '@moonwave99/fretboard.js';
import { useEffect, useRef, useState } from 'react';

const useFretboard = (figureRef, opts) => {
  const [fretboard, setFretboard] = useState(() => new Fretboard());
  useEffect(() => {
      const figure = figureRef.current;
      if (!figure) {
          return;
      }
      const fretboard = new Fretboard(Object.assign(opts, { el: figure }));
      setFretboard(fretboard);
      fretboard.render();
      return () => {
          fretboard.removeEventListeners();
          fretboard.clear();
          figure && Array.from(figure.children).forEach((child) => child.remove());
      };
  }, [figureRef, opts]);
  return fretboard;
};
const options = { tom: 10 }
const CLICK_TIMEOUT = 150;
let lastClick = false
const FretboardJSX = ({ dots, setDots }) => {

  const figureRef = useRef(null);

  const fretboard = useFretboard(figureRef, options);
  useEffect(() => {
    try {
      fretboard.on("mousemove", position => {
        setDots({ dot: position, type: 'hover' });
      });
      fretboard.on("mouseleave", () => {
        setDots({ type: 'clearHover' });
      });
      // fretboard.on("dblclick", ({ string, fret }) => {
      //   setDots({ string, fret, type: 'removeDot' });
      // });
      fretboard.on("click", position => {
        if (lastClick) {
          const { string, fret } = position;
          clearTimeout(lastClick);
          setDots({ string, fret, type: 'removeDot' });
          lastClick = false;
          return;
        }

        lastClick = setTimeout(() => {
          setDots({ dot: position, type: 'addDot' });
          lastClick = false;
        }, CLICK_TIMEOUT)
      });
    } catch (error) {

    }

  }, [fretboard])

  useEffect(() => {
    fretboard.setDots(dots).render();
  }, [dots])


  // useEffect(() => {
  //   const figure = figureRef.current;
  //   if (!figure) {
  //     return;
  //   }
  // },  [figureRef])

  // fretboard.render()

  return (

        <figure style={{width: '100%'}} ref={figureRef} />

  )
}

export { FretboardJSX as Fretboard };

