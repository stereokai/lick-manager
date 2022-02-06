import { createContext, useContext, useMemo, useReducer } from "react";

const BeatsContext = createContext();

class Notes {
  constructor() {
    this.map = new Map();
    this[Symbol.iterator] = this.values;
  }

  add(note) {
    try {
      if (!this.map.has(note)) {
        this.map.set(note.tex, note);
      }
      console.log("map", this.map);
    } catch (e) {
      debugger;
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

  size() {
    console.log("size", this.map.size);
    return this.map.size;
  }

  get immutable() {
    const arr = Array.from(this.map.values());
    const arr2 = arr.map((note) => note.immutable);
    // return Array.from(this.map.values()).map((note) => note.immutable);
    return arr2;
  }
}

const getNewNote = () => {
  return {
    string: 0,
    fret: 0,
    beats: [],
  };
};

class Note {
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
Note.getTex = (note) => {
  return `${note.fret}.${note.string}`;
};
Note.fromPosition = (position) => {
  return new Note(position.fret, position.string);
};
Note.fromTex = (noteTex) => {
  noteTex = noteTex.split(".");
  return new Note(noteTex[0], noteTex[1]);
};

class Beat {
  constructor(index) {
    this.index = index;
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
    console.log("add", this);
    return true;
  }

  removeNote(note) {
    if (!this.notes.has(getTex(note))) {
      return false;
    }

    this.strings[note.string - 1]--;
    this.notes.delete(note);
    return true;
  }
}

export const getTex = Note.getTex;

const getNewBeat = (index) => {
  return new Beat(index);
};

export const beatsReducer = (state, action) => {
  const { currentBeat } = state;
  let { beats, notes } = state;
  let beat;

  switch (action.type) {
    case "INCREMENT":
    case "ADD_BEAT":
      if (!beats.length || action.type === "ADD_BEAT") {
        beats = [...beats, getNewBeat(beats.length)];
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
      if (beat.addNote(action.note)) {
        // notes.set()
        return { ...state, beats: [...beats] };
      }
      return state;
    case "REMOVE_NOTE":
      // eslint-disable-next-line no-case-declarations
      beat = beats[action.index || currentBeat];
      if (!beat) return state;
      // have to create a new set to trigger React
      if (beat.removeNote(action.note)) {
        return { ...state, beats: [...beats] };
      }
      return state;
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export const BeatsProvider = (props) => {
  const [state, dispatch] = useReducer(beatsReducer, {
    beats: [getNewBeat(0)],
    notes: new Map(),
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
