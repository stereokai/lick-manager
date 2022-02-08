import { Note } from "./Note.js";
import { Notes } from "./Notes.js";

export class Beat {
  constructor(index, duration) {
    this.index = index;
    this.duration = duration;
    this.notes = new Notes();
    this.strings = Array(6).fill(0);
  }

  addNote(note) {
    if (this.strings[note.string - 1]) {
      return false;
    }

    const { fret, string } = note;
    this.strings[note.string - 1]++;
    this.notes.add(new Note(fret, string, this.index));
    return true;
  }

  removeNote(note) {
    if (!this.notes.has(Note.getTex(note))) {
      return false;
    }

    this.strings[note.string - 1]--;
    this.notes.delete(note);
    return true;
  }
}
