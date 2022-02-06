export class Note {
  constructor(fret, string, beat) {
    this.fret = fret;
    this.string = string;
    if (typeof beat !== "undefined") {
      this.beat = beat;
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
  return `${note.fret}.${note.string}`;
};

export const fromPosition = Note.fromPosition;
Note.fromPosition = (position) => {
  return new Note(position.fret, position.string);
};

export const fromTex = Note.fromTex;
Note.fromTex = (noteTex) => {
  noteTex = noteTex.split(".");
  return new Note(noteTex[0], noteTex[1]);
};
