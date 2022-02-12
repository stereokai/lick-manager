import { BeatsActions, useBeats } from "@/routes/Beats.jsx";
import { useHotkeys } from "react-hotkeys-hook";
import BeatControls from "./BeatControls.jsx";

const Toolbar = () => {
  const { dispatch } = useBeats();

  useHotkeys("left", (e) => {
    e.preventDefault();
    dispatch({ type: BeatsActions.DECREMENT_CURRENT_BEAT });
  });
  useHotkeys("right", (e) => {
    e.preventDefault();
    dispatch({ type: BeatsActions.INCREMENT_CURRENT_BEAT });
  });
  useHotkeys(
    "space",
    (e) => {
      e.preventDefault();
      dispatch({ type: BeatsActions.ADD_BEAT });
    },
    {
      filterPreventDefault: true,
    },
    () => false
  );
  useHotkeys("backspace", (e) => {
    e.preventDefault();
    dispatch({ type: BeatsActions.REMOVE_BEAT });
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <BeatControls />
        <button
          className="m-3 px-3 py-1 rounded bg-purple-700 text-white"
          onClick={() => dispatch({ type: BeatsActions.ADD_BEAT })}
        >
          Add Beat
        </button>
        <button
          className="m-3 px-3 py-1 rounded bg-blue-600 text-white"
          onClick={() => dispatch({ type: BeatsActions.SAVE_BEAT })}
        >
          Save
        </button>
      </div>
      <p className="m-3">
        Add beats with <kbd>space</kbd>. Select beats with <kbd>left</kbd> and{" "}
        <kbd>right</kbd> or by clicking on tablature. Add notes via fretboard.
        Remove beats with <kbd>backspace</kbd>.
      </p>
    </div>
  );
};
export default Toolbar;
