import { AlphaTabApi, Settings } from "@coderline/alphatab";
import React, { useEffect, useRef, useState } from "react";
import AlphatabOverlay from "./AlphatabOverlay";
const GuideType = {
  VisualBounds: 0,
  RealBounds: 1,
};

const GuideElements = {
  StaveGroups: 0,
  MasterBars: 1,
  Bars: 2,
  Beats: 3,
  Notes: 4,
};
function dotsToAlphaTex(dots) {
  return dots
    .filter(dot => !dot.moving)
    .reduce((str, dot) => {
      return str += ` ${dot.fret}.${dot.string}`
  }, ':4')
}

const BoundsLookupViewer = ({children, dots}) => {
  const alphaTabRef = useRef(null);


  const [alphaTab, setAlphaTab] = useState(() => {});
  const [boundsLookup, setBoundsLookup] = useState(() => {});
  useEffect(() => {
      const el = alphaTabRef.current;
      if (!el) {
        return;
      }
      const settings = new Settings()
      settings.display.staveProfile = 3;
      // const alphaTab = ;
      if (alphaTab) {
        alphaTab.destroy();
        console.log('dest1')
      }
      setAlphaTab(new AlphaTabApi(el, Object.assign(settings, {})));
      console.log('build')

      return () => {
          // alphaTab.removeEventListeners();
          alphaTab.destroy();
          console.log('dest2')
          // el && Array.from(el.children).forEach((child) => child.remove());
      };
  }, [alphaTabRef]);

  const [type, setType] = useState(GuideType.VisualBounds)
  const [elements, setElements] = useState(GuideElements.Beats)

  useEffect(() => {
    updateVisualGuides()
  }, [type, elements])


  useEffect(() => {
    console.log('ap')
    if (alphaTab) {
      alphaTab.postRenderFinished.on(() => {
        console.log('postrender')
        updateVisualGuides()
      });
      // alphaTab.render();
      window.apt = alphaTab;
    }
  }, [alphaTab])

  const updateVisualGuides = () => {
    if (!alphaTab || !alphaTabRef.current) {
      return;
    }
    const container = alphaTabRef.current;
    let guidesWrapper = container.querySelector(".at-guides");
    if (!guidesWrapper) {
      container.style.position = "relative";
      guidesWrapper = document.createElement("div");
      guidesWrapper.classList.add("at-guides");
      guidesWrapper.style.position = "absolute";
      guidesWrapper.style.zIndex = "1000";
      guidesWrapper.style.display = "inline";
      guidesWrapper.style.pointerEvents = "none";
      guidesWrapper.style.top = 0;
      guidesWrapper.style.left = 0;
      guidesWrapper.style.right = 0;
      guidesWrapper.style.bottom = 0;
      container.insertBefore(guidesWrapper, container.firstChild);
    } else {
      // guidesWrapper.innerHTML = "";
    }

    if (alphaTab.renderer.boundsLookup) {
      setBoundsLookup(alphaTab.renderer.boundsLookup)
      // createStaveGroupGuides(
      //   guidesWrapper,
      //   alphaTab.renderer.boundsLookup
      // );
    }
  }

  const createStaveGroupGuides = (wrapper, lookup) => {
    for (const staveGroup of lookup.staveGroups) {
      if (elements === GuideElements.StaveGroups) {
        createGuide(wrapper, staveGroup, "#1976d2");
      } else {
        createMasterBarGuides(wrapper, staveGroup);
      }
    }
  }

  const createMasterBarGuides = (wrapper, staveGroup) => {
    for (const masterBar of staveGroup.bars) {
      if (elements === GuideElements.MasterBars) {
        createGuide(wrapper, masterBar, "#388e3c");
      } else {
        createBarGuides(wrapper, masterBar);
      }
    }
  }

  const createBarGuides = (wrapper, masterBar) => {
    for (const bar of masterBar.bars) {
      if (elements === GuideElements.Bars) {
        createGuide(wrapper, bar, "#fdd835");
      } else {
        createBeatGuides(wrapper, bar);
      }
    }
  }

  const createBeatGuides = (wrapper, bar) => {
    for (const beat of bar.beats) {
      if (elements === GuideElements.Beats) {
        createGuide(wrapper, beat, "#e64a19");
      } else {
        createNoteGuides(wrapper, beat);
      }
    }
  }

  const createNoteGuides = (wrapper, beat) => {
    if (beat.notes) {
      for (const note of beat.notes) {
        createGuide(wrapper, note.noteHeadBounds, "#512da8");
      }
    }
  }

  const createGuide = (wrapper, bounds, color) => {
    const guide = document.createElement("div");
    guide.style.position = "absolute";
    const rect =
      "x" in bounds
        ? bounds
        : type === GuideType.VisualBounds
          ? bounds.visualBounds
          : bounds.realBounds;
    guide.style.left = rect.x + "px";
    guide.style.top = rect.y + "px";
    guide.style.width = rect.w + "px";
    guide.style.height = rect.h + "px";
    guide.style.border = `1px solid ${color}`;
    guide.style.background = hexToRgba(color, 0.5);
    wrapper.appendChild(guide);
  }

  const hexToRgba = (hex, alpha) => {
    let c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255},${alpha})`;
  }

  const typeClass = (ownType) => {
    return ownType === type ? " active" : "";
  }

  const elementClass = (ownElements) => {
    return ownElements === elements ? " active" : "";
  }

  useEffect(() => {
    console.log(dots)
    if (alphaTab) {
      alphaTab.tex(dotsToAlphaTex(dots))
    }
}, [JSON.stringify(dots.filter(dot => !dot.moving))])

    return (
      <div>
        <div className="relative"
          ref={alphaTabRef}
        >
          <AlphatabOverlay
            boundsLookup={boundsLookup}
            showStaveGroups={false}
            showMasterBars={false}
            showBars={false}
            showBeats={true}
            showNotes={false}
          />
        </div>
      </div>
    );
  }

  export default BoundsLookupViewer