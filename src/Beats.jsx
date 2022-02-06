import { createContext, useContext, useMemo, useReducer } from "react";
import { Beat } from "./models/Beat.js";

const BeatsContext = createContext();

const getNewBeat = (index) => {
  return new Beat(index);
};

export const beatsReducer = (state, action) => {
  const { currentBeat } = state;
  let { beats } = state;
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
