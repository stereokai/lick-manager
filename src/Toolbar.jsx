import { useHotkeys } from "react-hotkeys-hook";
import { BeatControls } from "./BeatControls.jsx";
import { BeatsActions, useBeats } from "./Beats.jsx";

export const Toolbar = () => {
  const {
    state: { currentBeat, beats },
    dispatch,
  } = useBeats();

  useHotkeys("left", () =>
    dispatch({ type: BeatsActions.DECREMENT_CURRENT_BEAT })
  );
  useHotkeys("right", () =>
    dispatch({ type: BeatsActions.INCREMENT_CURRENT_BEAT })
  );

  return (
    <div className="flex-col">
      <BeatControls />
      Current beat: {currentBeat + 1}, beats: {beats.length}
      <button
        className="m-1 px-3 py-1 rounded bg-purple-700 text-white"
        onClick={() => dispatch({ type: BeatsActions.ADD_BEAT })}
      >
        Add Beat
      </button>
      <br />
      Change beats with left and right keys
    </div>
  );
};
