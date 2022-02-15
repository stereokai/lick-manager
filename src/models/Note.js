export class Note {
  constructor(fret, string, beat) {
    this.fret = fret | 0;
    this.string = string | 0;
    if (typeof beat !== "undefined") {
      this.beat = beat | 0;
    }
  }

  get immutable() {
    const o = Object.assign({}, this);
    o.tex = this.tex;
    o.beats = new Set();
    return o;
  }

  get tex() {
    return Note.getTex(this);
  }
}

export const getTex = Note.getTex;
Note.getTex = (note) => {
  if (typeof note === "string") return note;
  return `${note.fret}.${note.string}`;
};

export const fromPosition = Note.fromPosition;
Note.fromPosition = (position, beatIndex) => {
  return new Note(position.fret, position.string, beatIndex);
};

export const fromTex = Note.fromTex;
Note.fromTex = (noteTex, beatIndex) => {
  noteTex = noteTex.split(".");
  return new Note(noteTex[0], noteTex[1], beatIndex);
};
