import { BeatDurations } from "./BeatDurations.js";

export const RestValues = {
  [BeatDurations.WHOLE]: {
    alternateCodepoint: "\u1d13B",
    codepoint: "\ue4e3",
    description: "Whole (semibreve) rest",
    tex: "1",
  },
  [BeatDurations.HALF]: {
    alternateCodepoint: "\u1d13C",
    codepoint: "\ue4e4",
    description: "Half (minim) rest",
    tex: "2",
  },
  [BeatDurations.QUARTER]: {
    alternateCodepoint: "\u1d13D",
    codepoint: "\ue4e5",
    description: "Quarter (crotchet) rest",
    tex: "4",
  },
  [BeatDurations.EIGHTH]: {
    alternateCodepoint: "\u1d13E",
    codepoint: "\ue4e6",
    description: "Eighth (quaver) rest",
    tex: "8",
  },
  [BeatDurations.SIXTEENTH]: {
    alternateCodepoint: "\u1d13F",
    codepoint: "\ue4e7",
    description: "sixteenth (semiquaver) rest",
    tex: "16",
  },
  [BeatDurations.THIRTYSECOND]: {
    alternateCodepoint: "\u1d140",
    codepoint: "\ue4e8",
    description: "thirtysecond (demisemiquaver) rest",
    tex: "32",
  },
  [BeatDurations.SIXTYFOURTH]: {
    alternateCodepoint: "\u1d141",
    codepoint: "\ue4e9",
    description: "sixtyfourth (hemidemisemiquaver) rest",
    tex: "64",
  },
};
