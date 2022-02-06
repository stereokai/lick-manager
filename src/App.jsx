import { useReducer } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Alphatab from "./Alphatab/Alphatab.jsx";
import { BeatsProvider, useBeats } from "./Beats.jsx";
import { dotsReducer } from "./dotsReducer.jsx";
import { Fretboard } from "./Fretboard.jsx";

const App = () => {
  const [dots, setDots] = useReducer(dotsReducer, []);

  function Display() {
    const {
      state: { currentBeat, beats },
      dispatch,
    } = useBeats();

    useHotkeys("left", () => dispatch({ type: "DECREMENT" }));
    useHotkeys("right", () => dispatch({ type: "INCREMENT" }));
    window.addBeat = () => {
      dispatch({ type: "ADD_BEAT" });
    };

    return (
      <div className="flex-shrink p-2">
        Current beat: {currentBeat + 1}, beats: {beats.length}
        <button
          className="m-1 px-3 py-1 rounded bg-purple-700 text-white"
          onClick={() => dispatch({ type: "ADD_BEAT" })}
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
