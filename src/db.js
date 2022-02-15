import Dexie from "dexie";

export const db = new Dexie("lickManager");
db.version(1).stores({
  licks: "++id, beats", // Primary key and indexed props
});

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
