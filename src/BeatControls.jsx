import { BeatsActions, useBeats } from "./Beats.jsx";
import {
  NoteValues,
  RestValues,
  RhythmicModifiers,
} from "./models/BeatProperties.jsx";

export const BeatControls = () => {
  const { dispatch } = useBeats();
  const setBeatProperty = (noteValue) => {
    dispatch({
      type: BeatsActions.SET_CURRENT_NOTEVALUE,
      noteValue,
    });
  };

  return (
    <>
      <div className="flex bravura m-3">
        {Object.entries(NoteValues).map((keyValuePair, i) => {
          const [valueName, noteValue] = keyValuePair;
          return (
            <button
              key={i}
              className="bg-purple-700 hover:bg-purple-300 text-white m-0 px-3 p-y1"
              onClick={() => {
                setBeatProperty(valueName);
              }}
            >
              <span>{noteValue.codepoint}</span>
            </button>
          );
        })}
      </div>
      <div className="flex bravura m-3">
        {Object.values(RestValues).map((rest, i) => (
          <button
            key={i}
            className="bg-purple-700 hover:bg-purple-300 text-white m-0 px-3 p-y1"
          >
            <span>{rest.codepoint}</span>
          </button>
        ))}
      </div>
      <div className="flex bravura m-3">
        {Object.values(RhythmicModifiers).map((modifier, i) => (
          <button
            key={i}
            className="bg-purple-700 hover:bg-purple-300 text-white m-0 px-3 p-y1"
          >
            <span>{modifier.codepoint}</span>
          </button>
        ))}
      </div>
    </>
  );
};
