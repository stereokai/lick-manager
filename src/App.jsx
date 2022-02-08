import { useReducer } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Alphatab from "./Alphatab/Alphatab.jsx";
import "./App.css";
import { BeatsActions, BeatsProvider, Durations, useBeats } from "./Beats.jsx";
import { dotsReducer } from "./Fretboard/dotsReducer.jsx";
import { Fretboard } from "./Fretboard/Fretboard.jsx";

const App = () => {
  const [dots, setDots] = useReducer(dotsReducer, []);

  function Display() {
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
      <div className="flex-shrink p-2">
        <div className="flex-col text-center">
          <div className="flex bravura m-3">
            {Object.values(Durations).map((duration, i) => (
              <button
                key={i}
                className="bg-purple-700 hover:bg-purple-300 text-white m-0 px-3 p-y1"
              >
                <span>{duration.codepoint}</span>
              </button>
            ))}
          </div>
        </div>
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
  }

  return (
    <div className="flex flex-col min-h-screen bg-red-300">
      <BeatsProvider>
        <Display />
        <div className="flex-grow bg-white m-5">
          <Alphatab tex="true" tracks="all" />
        </div>
        <div className="flex-shrink bg-white m-5">
          <Fretboard dots={dots} setDots={setDots} />
        </div>
      </BeatsProvider>
    </div>
  );
};

export default App;
