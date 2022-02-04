import { useReducer } from "react";
import Alphatab from "./Alphatab/Alphatab.jsx";
import { Fretboard } from "./Fretboard.jsx";

function dotsReducer(dots, action) {
  switch (action.type) {
    case "addDot":
      return [...dots, action.dot];
    case "removeDot":
      return [
        ...dots.filter(
          (dot) => dot.string !== action.string || dot.fret !== action.fret
        ),
      ];
    case "hover":
      return [
        ...dots.filter((dot) => !dot.moving),
        { ...action.dot, moving: true },
      ];
    case "clearHover":
      return [...dots.filter((dot) => !dot.moving)];
    default:
      return dots;
  }
}

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
