import { BeatsActions, useBeats } from "./Beats.jsx";
import { NoteValues, RestValues, RhythmicModifiers } from "./models/Beat.js";

export const BeatControls = () => {
  const {
    dispatch,
    state: { currentBeat, beats },
  } = useBeats();

  const testBeat = (beat, testFn, testValue) => {
    if (!beat || typeof testFn !== "function") return !!beat;
    return testFn(beat, testValue);
  };
  // Test FNs:
  const testDuration = (beat, noteValue) => beat.noteValue === noteValue;
  const testModifier = (beat, modifier) => beat.hasModifier(modifier);

  const getDurations = () => {
    return testBeat(beats[currentBeat], testModifier, RhythmicModifiers.rest)
      ? RestValues
      : NoteValues;
  };

  const isRest = () => {
    return beats[currentBeat].isRest;
  };

  const getClassObject = (beatProperty, testFn) => {
    return testBeat(beats[currentBeat], testFn, beatProperty)
      ? "bg-purple-500"
      : "";
  };

  const toggleModifier = (modifier) => {
    const beat = beats[currentBeat];
    if (!beat) return;

    const type = beat.hasModifier(modifier)
      ? BeatsActions.REMOVE_BEAT_MODIFIER
      : BeatsActions.ADD_BEAT_MODIFIER;
    dispatch({ type, modifier });
  };

  return (
    <div className="flex bravura">
      <div className={`m-3 ${isRest() ? "rest" : "notes"}`}>
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
                  noteValue: valueName,
                });
              }}
            >
              <span>{noteValue.codepoint}</span>
            </button>
          );
        })}
      </div>
      <div className="m-3">
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
    </div>
  );
};
