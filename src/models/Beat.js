import { BeatDurations } from "./BeatDurations.js";
import { Note } from "./Note.js";
import { Notes } from "./Notes.js";
import { NoteValues } from "./NoteValues.jsx";
import { RestValues } from "./RestValues.jsx";
import { RhythmicModifiers } from "./RhythmicModifiers.jsx";

window.RhythmicModifiers = RhythmicModifiers;

export { NoteValues, RestValues, RhythmicModifiers };
export class Beat {
  constructor(
    index,
    noteValue = BeatDurations.QUARTER,
    modifiers = Beat.initialModifierState
  ) {
    this.index = index;
    this.noteValue = noteValue;
    this.notes = new Notes();
    this.strings = Array(6).fill(0);
    this.modifiers = new Map(modifiers);
  }

  addNote(note) {
    if (!note) throw new Error("Can't add note, note is undefined");

    if (this.strings[note.string - 1]) {
      return false;
    }

    if (typeof note === "string") {
      note = Note.fromTex(note, this.index);
    } else {
      note = Note.fromPosition(note, this.index);
    }

    this.strings[note.string - 1]++;
    this.notes.add(note);
    return true;
  }

  removeNote(note) {
    if (!note) throw new Error("Can't remove note, note is undefined");

    if (!this.notes.has(Note.getTex(note))) {
      return false;
    }

    this.strings[note.string - 1]--;
    this.notes.delete(note);
    return true;
  }

  addModifier(modifier) {
    this.modifiers.set(modifier, 1);
  }

  removeModifier(modifier) {
    this.modifiers.set(modifier, 0);
  }

  hasModifier(modifier) {
    return this.modifiers.get(modifier) === 1;
  }

  setValue(noteValue) {
    this.noteValue = noteValue;
  }

  getDuration() {
    return (this.isRest ? RestValues : NoteValues)[this.noteValue];
  }

  get hasNotes() {
    return !!this.notes.size;
  }

  get isRest() {
    return this.hasModifier(RhythmicModifiers.REST) || !this.hasNotes;
  }

  get immutable() {
    return {
      noteValue: this.noteValue,
      notes: this.isRest ? [] : this.notes.immutable.map((note) => note.tex),
      modifiers: Object.fromEntries(this.modifiers),
    };
  }

  get tex() {
    let rhythmicModifiers = [...Beat.initialModifierState.keys()]
      .filter(
        (modifier) =>
          modifier !== RhythmicModifiers.REST && this.hasModifier(modifier)
      )
      .map((modifier) => RhythmicModifiers[modifier].tex)
      .join(" ")
      .trim();

    if (rhythmicModifiers) rhythmicModifiers = `{${rhythmicModifiers}}`;

    if (this.isRest) {
      return `${RhythmicModifiers[RhythmicModifiers.REST].tex}.${
        this.getDuration().tex
      }${rhythmicModifiers}`;
    }

    return `(${this.notes.immutable.map((note) => note.tex).join(" ")}).${
      this.getDuration().tex
    }${rhythmicModifiers}`;
  }
}

Beat.copy = (beat) => {
  return new Beat(beat.index + 1, beat.noteValue, beat.modifiers);
};

Beat.initialModifierState = new Map(
  Object.values(RhythmicModifiers)
    .filter((modifier) => typeof modifier === "string")
    .map((modifier) => [modifier, 0])
);
