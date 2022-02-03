export const OverlayType = {
  VisualBounds: 0,
  RealBounds: 1,
};

export const STAVE_GROUPS_TYPE = 'StaveGroups';
export const MASTER_BARS_TYPE = 'MasterBars';
export const BARS_TYPE = 'Bars';
export const BEATS_TYPE = 'Beats';
export const NOTES_TYPE = 'Notes';

export const ComponentGroups = {
  [STAVE_GROUPS_TYPE]: 'staveGroups' ,
  [MASTER_BARS_TYPE]: 'bars' ,
  [BARS_TYPE]: 'bars' ,
  [BEATS_TYPE]: 'beats' ,
  [NOTES_TYPE]: 'notes' ,
};

const alphaTabComponentGroups = []
for (let key in ComponentGroups) {
  alphaTabComponentGroups.push({
    name: key,
    key: ComponentGroups[key]
  })
}

export function collectAlphaTabComponents(container, level, components = []) {
  if (level < alphaTabComponentGroups.length) {
    const nextContainer = container[alphaTabComponentGroups[level].key];

    if (nextContainer) {
      let index = 0;

      for (const member of nextContainer) {
        // Optimistically ignore duplicates (AlphaTab bug)
        if (index && member.index <= index) {
          continue;
        }

        components.push({
          index: member.index,
          bounds: member.visualBounds || member.noteHeadBounds,
          type: alphaTabComponentGroups[level].name,
          member
        })
        console.log(components[components.length - 1])
        collectAlphaTabComponents(member, level + 1, components)
        index++
      }
    }
  }
  window.cmps = components
  return components;
}