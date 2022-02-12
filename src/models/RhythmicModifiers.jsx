export const RhythmicModifiers = {
  REST: "_REST_",
  DOTTED: "_DOTTED_",
  TUPLET3: "_TUPLET3_",
};

RhythmicModifiers[RhythmicModifiers.REST] = {
  alternateCodepoint: "\u1d13D",
  codepoint: "\ue4e5",
  description: "Rest note",
  tex: "r",
};
RhythmicModifiers[RhythmicModifiers.DOTTED] = {
  alternateCodepoint: "\u1d17C",
  codepoint: "\ue4a2",
  description: "Dotted note",
  tex: "d",
};
RhythmicModifiers[RhythmicModifiers.TUPLET3] = {
  codepoint: "\ue883",
  description: "Tuplet 3",
  tex: "tu 3",
};
