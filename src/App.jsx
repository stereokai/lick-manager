import "./App.css";
import { BeatsProvider } from "./Beats.jsx";
import Alphatab from "./components/Alphatab";
import Fretboard from "./components/Fretboard";
import Toolbar from "./components/Toolbar.jsx";

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
