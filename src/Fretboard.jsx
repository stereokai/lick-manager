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
function FretboardJSX() {
  const [dots, setDots] = useState([])



  const figureRef = useRef(null);

  const fretboard = useFretboard(figureRef, options);
  useEffect(() => {
    try {
      fretboard.on("mousemove", position => {
        setDots(dots => [...dots
          .filter((x) => !x.moving), { ...position, moving: true }])
      });
      fretboard.on("mouseleave", () => {
        setDots(dots => [...dots.filter((x) => !x.moving)])
      });
      fretboard.on("dblclick", ({ string, fret }) => {
        setDots(dots => [...dots.filter((x) => x.string !== string || x.fret !== fret)])
      });
      fretboard.on("click", position => {
        setDots(dots => [...dots, position]);
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

export { FretboardJSX as Fretboard }
