import Alphatab from "./Alphatab/Alphatab.jsx";
import "./App.css";
import { BeatsProvider } from "./Beats.jsx";
import { Fretboard } from "./Fretboard/Fretboard.jsx";
import Toolbar from "./Toolbar.jsx";

const App = () => (
  <div className="flex flex-col min-h-screen bg-red-300">
    <BeatsProvider>
      <div className="flex-shrink p-2">
        <Toolbar />
      </div>
      <div className="flex-grow bg-white m-5">
        <Alphatab tex="true" tracks="all" />
      </div>
      <div className="flex-shrink bg-white m-5">
        <Fretboard />
      </div>
    </BeatsProvider>
  </div>
);

export default App;
