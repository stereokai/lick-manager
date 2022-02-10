import { BeatDurations } from "./BeatDurations.js";

export const NoteValues = {
  [BeatDurations.WHOLE]: {
    alternateCodepoint: "\u1d15D",
    codepoint: "\ue1d2",
    description: "Whole note (semibreve)",
    tex: "1",
  },
  [BeatDurations.HALF]: {
    alternateCodepoint: "\u1d15E",
    codepoint: "\ue1d3",
    description: "Half note (minim) stem up",
    tex: "2",
  },
  [BeatDurations.QUARTER]: {
    alternateCodepoint: "\u1d15F",
    codepoint: "\ue1d5",
    description: "Quarter note (crotchet) stem up",
    tex: "4",
  },
  [BeatDurations.EIGHTH]: {
    alternateCodepoint: "\u1d160",
    codepoint: "\ue1d7",
    description: "Eighth note (quaver) stem up",
    tex: "8",
  },
  [BeatDurations.SIXTEENTH]: {
    alternateCodepoint: "\u1d161",
    codepoint: "\ue1d9",
    description: "sixteenth note (semiquaver) stem up",
    tex: "16",
  },
  [BeatDurations.THIRTYSECOND]: {
    alternateCodepoint: "\u1d162",
    codepoint: "\ue1db",
    description: "thirtysecond note (demisemiquaver) stem up",
    tex: "32",
  },
  [BeatDurations.SIXTYFOURTH]: {
    alternateCodepoint: "\u1d163",
    codepoint: "\ue1dd",
    description: "sixtyfourth note (hemidemisemiquaver) stem up",
    tex: "64",
  },
};
