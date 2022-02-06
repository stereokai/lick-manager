import { createContext, useContext, useMemo, useReducer } from "react";
import { Beat } from "./models/Beat.js";

const BeatsContext = createContext();

const getNewBeat = (index) => {
  return new Beat(index);
};

export const BeatsActions = {
  INCREMENT_CURRENT_BEAT: "INCREMENT_CURRENT_BEAT",
  DECREMENT_CURRENT_BEAT: "DECREMENT_CURRENT_BEAT",
  SET_CURRENT_BEAT: "SET_CURRENT_BEAT",
  ADD_BEAT: "ADD_BEAT",
  ADD_NOTE_TO_CURRENT_BEAT: "ADD_NOTE_TO_CURRENT_BEAT",
  REMOVE_NOTE_FROM_CURRENT_BEAT: "REMOVE_NOTE_FROM_CURRENT_BEAT",
};

export const beatsReducer = (state, action) => {
  const { currentBeat } = state;
  let { beats } = state;
  let beat;

  switch (action.type) {
    case BeatsActions.INCREMENT_CURRENT_BEAT:
    case BeatsActions.ADD_BEAT:
      if (!beats.length || action.type === BeatsActions.ADD_BEAT) {
        beats = [...beats, getNewBeat(beats.length)];
      }
      return {
        ...state,
        beats,
        currentBeat: Math.min(currentBeat + 1, beats.length - 1),
      };
    case BeatsActions.DECREMENT_CURRENT_BEAT:
      return { ...state, currentBeat: Math.max(currentBeat - 1, 0) };
    case BeatsActions.SET_CURRENT_BEAT:
      return { ...state, currentBeat: action.beat };
    case BeatsActions.ADD_NOTE_TO_CURRENT_BEAT:
      // eslint-disable-next-line no-case-declarations
      beat = beats[action.index || currentBeat];
      if (!beat) return state;
      // have to create a new set to trigger React
      if (beat.addNote(action.note)) {
        return { ...state, beats: [...beats] };
      }
      return state;
    case BeatsActions.REMOVE_NOTE_FROM_CURRENT_BEAT:
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
