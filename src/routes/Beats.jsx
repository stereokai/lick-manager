import { getLick, saveLick } from "@/db.js";
import { Beat, RhythmicModifiers } from "@/models/Beat.js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  ADD_NOTE_TO_BEAT: "ADD_NOTE_TO_BEAT",
  REMOVE_NOTE_FROM_CURRENT_BEAT: "REMOVE_NOTE_FROM_CURRENT_BEAT",
  SAVE_LICK: "SAVE_LICK",
  LOAD_LICK: "LOAD_LICK",
};

const getNewBeat = (beat) => {
  if (beat instanceof Beat) return Beat.copy(beat);

  return new Beat(0);
};

const getInitialState = () => [getNewBeat()];

export const beatsReducer = (state, action) => {
  const { currentBeat } = state;
  let beats = [...state.beats];
  let beat;

  const normalizeBeatIndex = (index) =>
    Math.max(0, Math.min(index, beats.length - 1));

  switch (action.type) {
    case BeatsActions.LOAD_LICK:
      return {
        ...state,
        beats: action.lick,
        currentBeat: 0,
      };
    case BeatsActions.SAVE_LICK:
      saveLick(beats);
      return state;
    case BeatsActions.INCREMENT_CURRENT_BEAT:
      return {
        ...state,
        currentBeat: normalizeBeatIndex(currentBeat + 1),
      };
    case BeatsActions.ADD_BEAT:
      beats.splice(currentBeat + 1, 0, getNewBeat(beats[currentBeat]));

      return {
        ...state,
        beats,
        currentBeat: currentBeat + 1,
      };
    case BeatsActions.REMOVE_BEAT:
      if (beats.length > 1) {
        beats.splice(typeof action.index === "number" || currentBeat, 1);
      } else {
        beats = getInitialState();
      }

      return {
        ...state,
        beats,
        currentBeat: normalizeBeatIndex(currentBeat),
      };
    case BeatsActions.DECREMENT_CURRENT_BEAT:
      return { ...state, currentBeat: normalizeBeatIndex(currentBeat - 1) };
    case BeatsActions.SET_CURRENT_BEAT:
      return { ...state, currentBeat: action.beat };
    case BeatsActions.ADD_NOTE_TO_BEAT:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;
      if (beat.addNote(action.note)) {
        if (beat.hasModifier(RhythmicModifiers.REST)) {
          beat.removeModifier(RhythmicModifiers.REST);
        }
        return { ...state, beats };
      }
      return state;
    case BeatsActions.REMOVE_NOTE_FROM_CURRENT_BEAT:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;
      if (beat.removeNote(action.note)) {
        return { ...state, beats };
      }
      return state;
    case BeatsActions.SET_BEAT_NOTEVALUE:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;

      beat.setValue(action.noteValue);
      return { ...state, beats };
    case BeatsActions.ADD_BEAT_MODIFIER:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;

      beat.addModifier(action.modifier);
      return { ...state, beats };
    case BeatsActions.REMOVE_BEAT_MODIFIER:
      beat = beats[action.index || currentBeat];
      if (!beat) return state;

      beat.removeModifier(action.modifier);
      return { ...state, beats };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export const BeatsProvider = (props) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(beatsReducer, {
    beats: getInitialState(),
    currentBeat: 0,
  });

  const [requestedLick, setRequestedLick] = useState();
  const { lickId } = useParams();

  useEffect(() => {
    if (requestedLick)
      dispatch({ type: BeatsActions.LOAD_LICK, lick: requestedLick });
  }, [requestedLick]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchLick = async () => {
      const lick = await getLick(lickId | 0);

      if (isSubscribed && lick) {
        setRequestedLick(lick);
      }
    };

    fetchLick().catch(() => {
      navigate("/lick/new");
    });

    return () => (isSubscribed = false);
  }, [lickId, setRequestedLick]);

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
