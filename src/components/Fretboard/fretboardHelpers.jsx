export const dedupeNotes = (beats) => {
  if (!beats.length) return [];
  function set(k, v) {
    allNotes.set(k, v);
    return allNotes.get(k);
  }
  const allNotes = new Map();
  for (let i = 0; i < beats.length; i++) {
    if (beats[i].isRest) continue;

    const notes = beats[i].notes;

    for (const note of notes) {
      const savedNote = allNotes.get(note.tex) || set(note.tex, note.immutable);
      savedNote.beats.add(i);
    }
  }

  return Array.from(allNotes.values());
};
