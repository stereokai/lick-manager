import { Beat } from "@/models/Beat.js";
import Dexie from "dexie";
export const db = new Dexie("lickManager");
db.version(1).stores({
  licks: "++id, beats", // Primary key and indexed props
});

const rhythmicModifiers = [...Beat.initialModifierState.keys()];

// beats: string
// quarter|3.4,3.5,2.6|011
// noteValue|notes list|modifiers as booleans

export async function saveLick(lick) {
  return db.licks.add({
    beats: lick
      .map((beat) => beat.immutable)
      .map((beat) =>
        [
          beat.noteValue,
          beat.notes.join(","),
          Object.values(beat.modifiers).join(""),
        ].join("|")
      )
      .join("+"),
  });
}

function lickMapper(lickString) {
  return lickString.split("+").reduce((beats, beatString, beatIndex) => {
    const [noteValue, notesAsString, modifiersAsString] = beatString.split("|");
    const beat = new Beat(beatIndex, noteValue);
    [...modifiersAsString].forEach((flag, i) => {
      if (flag | 0) {
        beat.addModifier(rhythmicModifiers[i]);
      }
    });
    notesAsString &&
      notesAsString.split(",").forEach((note) => beat.addNote(note));
    beat.beatString = beatString;
    beats[beatIndex] = beat;
    return beats;
  }, []);
}

export async function getLicks() {
  const res = await db.licks.toArray();
  return res.map(({ id, beats }) => ({
    id,
    beats: lickMapper(beats),
  }));
}

export async function getLick(id) {
  const res = await db.licks.get(id);
  if (res) return lickMapper(res.beats);
}
