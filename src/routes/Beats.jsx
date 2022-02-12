import { createContext, useContext, useMemo, useReducer } from "react";
import { Beat } from "../models/Beat.js";

const BeatsContext = createContext();

export const BeatsActions = {
  INCREMENT_CURRENT_BEAT: "INCREMENT_CURRENT_BEAT",
  DECREMENT_CURRENT_BEAT: "DECREMENT_CURRENT_BEAT",
  SET_CURRENT_BEAT: "SET_CURRENT_BEAT",
  SET_BEAT_NOTEVALUE: "SET_BEAT_NOTEVALUE",
  ADD_BEAT_MODIFIER: "ADD_BEAT_MODIFIER",
  REMOVE_BEAT_MODIFIER: "REMOVE_BEAT_MODIFIER",
  ADD_BEAT: "ADD_BEAT",
  REMOVE_BEAT: "REMOVE_BEAT",
  ADD_NOTE_TO_CURRENT_BEAT: "ADD_NOTE_TO_CURRENT_BEAT",
  REMOVE_NOTE_FROM_CURRENT_BEAT: "REMOVE_NOTE_FROM_CURRENT_BEAT",
  SAVE_BEAT: "SAVE_BEAT",
};

const getNewBeat = (beat) => {
  if (beat instanceof Beat)
    return new Beat(beat.index + 1, beat.noteValue, new Set(beat.modifiers));

  return new Beat(0);
};

export const beatsReducer = (state, action) => {
  const { currentBeat } = state;
  let { beats } = state;
  let beat;

  const normalizeBeatIndex = (index) =>
    Math.max(0, Math.min(index, beats.length - 1));

  switch (action.type) {
    case BeatsActions.SAVE_BEAT:
      console.log(
        "beats",
        state.beats.map((beat) => beat.immutable)
      );
      return state;
    case BeatsActions.INCREMENT_CURRENT_BEAT:
      return {
        ...state,
        currentBeat: normalizeBeatIndex(currentBeat + 1),
      };
    case BeatsActions.ADD_BEAT:
      beats = [...beats];
      beats.splice(currentBeat + 1, 0, getNewBeat(beats[currentBeat]));

      return {
        ...state,
        beats,
        currentBeat: currentBeat + 1,
      };
    case BeatsActions.REMOVE_BEAT:
      // eslint-disable-next-line no-case-declarations
      let arr = [...beats];
      if (beats.length > 1) {
        arr.splice(typeof action.index === "number" || currentBeat, 1);
      } else {
        arr = [getNewBeat()];
      }

      return {
        ...state,
        beats: arr,
        currentBeat: normalizeBeatIndex(currentBeat),
      };
    case BeatsActions.DECREMENT_CURRENT_BEAT:
      return { ...state, currentBeat: normalizeBeatIndex(currentBeat - 1) };
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
    case BeatsActions.SET_BEAT_NOTEVALUE:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;

      beat.setValue(action.noteValue);
      return { ...state, beats: [...beats] };
    case BeatsActions.ADD_BEAT_MODIFIER:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;

      beat.addModifier(action.modifier);
      return { ...state, beats: [...beats] };
    case BeatsActions.REMOVE_BEAT_MODIFIER:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;

      beat.removeModifier(action.modifier);
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
