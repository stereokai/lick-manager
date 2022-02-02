import { AlphaTabApi, Settings } from "@coderline/alphatab";
import { useEffect, useRef, useState } from 'react';

const useAlphaTab = (divRef, opts) => {
  const [alphaTab, setAlphaTab] = useState(() => {});
  useEffect(() => {
      const el = divRef.current;
      if (!el) {
        return;
      }
      const settings = new Settings()
      const alphaTab = new AlphaTabApi(el, settings);
      setAlphaTab(alphaTab);
      // alphaTab.render();
      return () => {
          // alphaTab.removeEventListeners();
          // alphaTab.clear();
          // el && Array.from(el.children).forEach((child) => child.remove());
      };
  }, [divRef, opts]);
  return alphaTab;
};

const options = {
  core: {
    tex: true
  },
  display: {
    staveProfile: "tab",
    // resources: {
    //    staffLineColor: "rgb(200, 10, 110)"
    // }
  },
  notation: {
    elements: {
      scoreTitle: false,
      scoreWordsAndMusic: false,
      effectTempo: false,
      guitarTuning: false
    }
  },
  player: {
    scrollMode: "off",
    enablePlayer: true,
    enableUserInteraction: true,
    enableCursor: true
  }
}
const json =JSON.stringify(options)

// document.querySelector('#alphaTab').addEventListener('alphaTab.beatMouseDown', function(e) {
// var beat = e.detail;
// e.originalEvent.preventDefault();
// console.log(beat)
// }, false);

// .tex(`:4 1.6 1.6 3.6 0.5 2.5 3.5 0.4 2.4 |
//    3.4 0.3 2.3 0.2 1.2 3.2 0.1 1.1 |
//    3.1.1`)

function dotsToAlphaTex(dots) {
  return dots
    .filter(dot => !dot.moving)
    .reduce((str, dot) => {
      return str += ` ${dot.fret}.${dot.string}`
  }, ':4')
}

export default function AlphaTab ({dots}) {

  const divRef = useRef(null);


  const [alphaTab, setAlphaTab] = useState(() => {});
  useEffect(() => {
      const el = divRef.current;
      if (!el) {
        return;
      }
      const settings = new Settings()
      settings.fillFromJson(json)
      // const alphaTab = ;
      if (alphaTab) {
        alphaTab.destroy();
        console.log('dest1')
      }
      setAlphaTab(new AlphaTabApi(el, Object.assign(settings, {})));
      console.log('build')
      // alphaTab.render();
      return () => {
          // alphaTab.removeEventListeners();
          alphaTab.destroy();
          console.log('dest2')
          // el && Array.from(el.children).forEach((child) => child.remove());
      };
  }, [divRef, options]);


  useEffect(() => {
    if (alphaTab) {
      alphaTab.tex(dotsToAlphaTex(dots))
    }
}, [dots])

  return (
    <div ref={divRef}></div>
  )
}
