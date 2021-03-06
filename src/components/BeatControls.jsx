import { BeatsActions, useBeats } from "@/routes/Beats.jsx";
import { NoteValues, RestValues, RhythmicModifiers } from "../models/Beat.js";

const BeatControls = () => {
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
  const testModifier = (beat, modifier) => {
    if (modifier === RhythmicModifiers.REST && beat.isRest) {
      return true;
    }
    return beat.hasModifier(modifier);
  };

  const getDurations = () => {
    return testBeat(beats[currentBeat], testModifier, RhythmicModifiers.REST)
      ? RestValues
      : NoteValues;
  };

  const getButtonClass = (beatProperty, testFn, i, lastI) => {
    return [
      i === 0 ? "rounded-l" : "",
      i === lastI ? "rounded-r" : "",
      testBeat(beats[currentBeat], testFn, beatProperty)
        ? "bg-purple-500"
        : "bg-purple-700",
    ].join(" ");
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
      <div
        className={`m-3 ${
          (beats[currentBeat] || {}).isRest ? "rest" : "notes"
        }`}
      >
        {Object.entries(getDurations()).map((keyValuePair, i, arr) => {
          const [valueName, noteValue] = keyValuePair;
          return (
            <button
              key={i}
              className={`hover:bg-purple-300 text-white m-0 px-3 p-y1 ${getButtonClass(
                valueName,
                testDuration,
                i,
                arr.length - 1
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
        {Object.entries(RhythmicModifiers)
          .filter(([modifierKey, modifier]) => typeof modifier !== "string")
          .map(([modifierKey, modifier], i, arr) => (
            <button
              key={i}
              className={`hover:bg-purple-300 text-white m-0 px-3 p-y1 ${getButtonClass(
                modifierKey,
                testModifier,
                i,
                arr.length - 1
              )}`}
              onClick={() => toggleModifier(modifierKey)}
            >
              <span>{modifier.codepoint}</span>
            </button>
          ))}
      </div>
    </div>
  );
};
export default BeatControls;
