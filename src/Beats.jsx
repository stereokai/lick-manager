import { createContext, useContext, useMemo, useReducer } from "react";

const BeatsContext = createContext();

const getNewBeat = () => {
  return { notes: new Set(), strings: Array(6).fill(0) };
};

const getNoteTex = (note) => {
  return `${note.fret}:${note.string}`;
};

const addNoteToBeat = (beat, note) => {
  if (beat.strings[note.string - 1]) {
    return beat;
  }

  beat.strings[note.string - 1]++;
  beat.notes = new Set(beat.notes).add(getNoteTex(note));
  return beat;
};

const removeNoteFromBeat = (beat, note) => {
  if (!beat.notes.has(getNoteTex(note))) {
    return beat;
  }

  beat.strings[note.string - 1]--;
  beat.notes = new Set(beat.notes);
  beat.notes.delete(getNoteTex(note));
  return beat;
};

export const beatsReducer = (state, action) => {
  const { currentBeat } = state;
  let { beats } = state;
  let beat;

  switch (action.type) {
    case "INCREMENT":
    case "ADD_BEAT":
      if (!beats.length || action.type === "ADD_BEAT") {
        beats = [...beats, getNewBeat()];
      }
      return {
        ...state,
        beats,
        currentBeat: Math.min(currentBeat + 1, beats.length - 1),
      };
    case "DECREMENT":
      return { ...state, currentBeat: Math.max(currentBeat - 1, 0) };
    case "SET":
      return { ...state, currentBeat: action.index };
    case "ADD_NOTE":
      // eslint-disable-next-line no-case-declarations
      beat = beats[action.index || currentBeat];
      if (!beat) return state;
      // have to create a new set to trigger React
      beat = addNoteToBeat(beat, action.note);
      return { ...state, beats: [...beats] };
    case "REMOVE_NOTE":
      // eslint-disable-next-line no-case-declarations
      beat = beats[action.index || currentBeat];
      if (!beat) return state;
      // have to create a new set to trigger React
      beat = removeNoteFromBeat(beat, action.note);
      return { ...state, beats: [...beats] };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export const BeatsProvider = (props) => {
  const [state, dispatch] = useReducer(beatsReducer, {
    beats: [getNewBeat()],
    currentBeat: 0,
  });
  const value = useMemo(() => [state, dispatch], [state]);
  return <BeatsContext.Provider value={value} {...props} />;
};

export const useBeats = () => {
  const context = useContext(BeatsContext);
  if (!context) {
    throw new Error(`useBeats must be used within a BeatsProvider`);
  }
  const [state, dispatch] = context;

  return {
    state,
    dispatch,
  };
};
