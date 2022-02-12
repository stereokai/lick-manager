import { Note } from "./Note";

export class Notes {
  constructor() {
    this.map = new Map();
    this[Symbol.iterator] = this.values;
  }

  add(note) {
    if (!(note instanceof Note)) return;

    if (!this.map.has(note)) {
      this.map.set(note.tex, note);
    }
    return this.map;
  }

  values() {
    return this.map.values();
  }

  delete(note) {
    const noteTex = Note.getTex(note);
    this.map.delete(noteTex);
    return this.map;
  }

  has(note) {
    const noteTex = Note.getTex(note);
    return this.map.has(noteTex);
  }

  get size() {
    return this.map.size;
  }

  get immutable() {
    return Array.from(this.map.values()).map((note) => note.immutable);
  }
}
