
export const createStaveGroupGuides = (wrapper, lookup) => {
  for (const staveGroup of lookup.staveGroups) {
    if (elements === GuideElements.StaveGroups) {
      createGuide(wrapper, staveGroup, "#1976d2");
    } else {
      createMasterBarGuides(wrapper, staveGroup);
    }
  }
}

export const createMasterBarGuides = (wrapper, staveGroup) => {
  for (const masterBar of staveGroup.bars) {
    if (elements === GuideElements.MasterBars) {
      createGuide(wrapper, masterBar, "#388e3c");
    } else {
      createBarGuides(wrapper, masterBar);
    }
  }
}

export const createBarGuides = (wrapper, masterBar) => {
  for (const bar of masterBar.bars) {
    if (elements === GuideElements.Bars) {
      createGuide(wrapper, bar, "#fdd835");
    } else {
      createBeatGuides(wrapper, bar);
    }
  }
}

export const createBeatGuides = (wrapper, bar) => {
  for (const beat of bar.beats) {
    if (elements === GuideElements.Beats) {
      createGuide(wrapper, beat, "#e64a19");
    } else {
      createNoteGuides(wrapper, beat);
    }
  }
}

export const createNoteGuides = (wrapper, beat) => {
  if (beat.notes) {
    for (const note of beat.notes) {
      createGuide(wrapper, note.noteHeadBounds, "#512da8");
    }
  }
}

export const hexToRgba = (hex, alpha) => {
  let c = hex.substring(1).split("");
  if (c.length == 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  c = "0x" + c.join("");
  return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255},${alpha})`;
}
