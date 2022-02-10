import {
  NoteValues,
  RestValues,
  RhythmicModifiers,
} from "../models/BeatProperties.jsx";
import { Note } from "./Note.js";
import { NoteDurations } from "./NoteDurations.js";
import { Notes } from "./Notes.js";

export class Beat {
  constructor(index, noteValue = NoteDurations.QUARTER, modifiers = new Set()) {
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

  hasModifier(modifier) {
    return this.modifiers.has(modifier);
  }

  setValue(noteValue) {
    this.noteValue = noteValue;
  }

  getDuration() {
    return (this.isRest ? RestValues : NoteValues)[this.noteValue];
  }

  get isRest() {
    return this.hasModifier(RhythmicModifiers.rest);
  }

  get tex() {
    let rhythmicModifiers = [...this.modifiers]
      .filter((m) => m !== RhythmicModifiers.rest)
      .map((m) => m.tex)
      .join(" ")
      .trim();

    if (rhythmicModifiers) rhythmicModifiers = `{${rhythmicModifiers}}`;

    if (this.isRest) {
      return `${RhythmicModifiers.rest.tex}.${
        this.getDuration().tex
      }${rhythmicModifiers}`;
    }

    return `(${this.notes.immutable.map((note) => note.tex).join(" ")}).${
      this.getDuration().tex
    }${rhythmicModifiers}`;
  }
}
