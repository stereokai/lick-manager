import { BeatsActions, useBeats } from "./Beats.jsx";
import {
  NoteValues,
  RestValues,
  RhythmicModifiers,
} from "./models/BeatProperties.jsx";

export const BeatControls = () => {
  const {
    dispatch,
    state: { currentBeat, beats },
  } = useBeats();

  const getDurations = () => {
    const beat = beats[currentBeat];

    return beat && beat.hasModifier(RhythmicModifiers.rest)
      ? RestValues
      : NoteValues;
  };

  const getClassObject = (beatProperty, test) => {
    const beat = beats[currentBeat];

    console.log(beat, beatProperty, test.toString());

    return beat && test(beat, beatProperty) ? "bg-purple-500" : "";
  };

  const testDuration = (beat, noteValue) => beat.noteValue === noteValue;
  const testModifier = (beat, modifier) => beat.hasModifier(modifier);

  const toggleModifier = (modifier) => {
    const beat = beats[currentBeat];
    if (!beat) return;

    const type = beat.hasModifier(modifier)
      ? BeatsActions.REMOVE_BEAT_MODIFIER
      : BeatsActions.ADD_BEAT_MODIFIER;
    dispatch({ type, modifier });
  };

  return (
    <>
      <div className="flex bravura m-3">
        {Object.entries(getDurations()).map((keyValuePair, i) => {
          const [valueName, noteValue] = keyValuePair;
          return (
            <button
              key={i}
              className={`bg-purple-700 hover:bg-purple-300 text-white m-0 px-3 p-y1 ${getClassObject(
                valueName,
                testDuration
              )}`}
              onClick={() => {
                dispatch({
                  type: BeatsActions.SET_BEAT_NOTEVALUE,
                  valueName,
                });
              }}
            >
              <span>{noteValue.codepoint}</span>
            </button>
          );
        })}
      </div>
      <div className="flex bravura m-3">
        {Object.values(RhythmicModifiers).map((modifier, i) => (
          <button
            key={i}
            className={`bg-purple-700 hover:bg-purple-300 text-white m-0 px-3 p-y1 ${getClassObject(
              modifier,
              testModifier
            )}`}
            onClick={() => toggleModifier(modifier)}
          >
            <span>{modifier.codepoint}</span>
          </button>
        ))}
      </div>
    </>
  );
};
