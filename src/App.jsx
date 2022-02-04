import { useReducer } from "react";
import Alphatab from "./Alphatab/Alphatab.jsx";
import { dotsReducer } from "./dotsReducer.jsx";
import { Fretboard } from "./Fretboard.jsx";

const App = () => {
  const [dots, setDots] = useReducer(dotsReducer, []);

  return (
    <div className="flex flex-col min-h-screen bg-red-300">
      <div className="flex-grow bg-white m-5">
        <Alphatab
          dots={dots.filter((dot) => !dot.moving)}
          tex="true"
          tracks="all"
        />
      </div>
      <div className="flex-shrink bg-white m-5">
        <Fretboard dots={dots} setDots={setDots} />
      </div>
    </div>
  );
};

export default App;
