import { BeatsActions, useBeats } from "@/routes/Beats.jsx";
import { useHotkeys } from "react-hotkeys-hook";
import BeatControls from "./BeatControls.jsx";

const Toolbar = () => {
  const { dispatch } = useBeats();

  useHotkeys("left", () =>
    dispatch({ type: BeatsActions.DECREMENT_CURRENT_BEAT })
  );
  useHotkeys("right", () =>
    dispatch({ type: BeatsActions.INCREMENT_CURRENT_BEAT })
  );

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
        Add notes via fretboard, change beats with left and right keys or by
        clicking on tablature
      </p>
    </div>
  );
};
export default Toolbar;
