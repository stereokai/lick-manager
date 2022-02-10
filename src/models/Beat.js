import { Note } from "./Note.js";
import { Notes } from "./Notes.js";

export class Beat {
  constructor(index, noteValue = "quarter", modifiers = new Set()) {
    this.index = index;
    this.noteValue = noteValue;
    this.notes = new Notes();
    this.strings = Array(6).fill(0);
    this.modifiers = modifiers;
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

  addModifier(modifier) {
    this.modifiers.add(modifier);
  }

  removeModifier(modifier) {
    this.modifiers.delete(modifier);
  }

  setValue(noteValue) {
    this.noteValue = noteValue;
  }
}
