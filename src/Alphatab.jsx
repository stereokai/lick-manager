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


// document.querySelector('#alphaTab').addEventListener('alphaTab.beatMouseDown', function(e) {
// var beat = e.detail;
// e.originalEvent.preventDefault();
// console.log(beat)
// }, false);

// .tex(`:4 1.6 1.6 3.6 0.5 2.5 3.5 0.4 2.4 |
//    3.4 0.3 2.3 0.2 1.2 3.2 0.1 1.1 |
//    3.1.1`)

function AlphaTab() {

  const divRef = useRef(null);

  const alphaTab = useAlphaTab(divRef, options);

  return (
    <div ref={divRef} data-tex={'true'}>
\title "Hello alphaTab"
.
:4 0.6 1.6 3.6 0.5 2.5 3.5 0.4 2.4 |
   3.4 0.3 2.3 0.2 1.2 3.2 0.1 1.1 |
   3.1.1
    </div>
  )
}

export default AlphaTab;
