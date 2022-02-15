import { BeatsProvider } from "@/routes/Beats.jsx";
import { Link } from "react-router-dom";
import "./App.css";
import Alphatab from "./components/Alphatab";
import { FretboardInteractive } from "./components/Fretboard";
import Toolbar from "./components/Toolbar.jsx";

const App = () => (
  <main className="flex flex-col min-h-screen bg-red-300">
    <nav className="flex p-3">
      <Link className="mx-3" to="/">
        Editor
      </Link>
      <Link className="mx-3" to="/licks">
        Licks
      </Link>
    </nav>
    <BeatsProvider>
      <div className="flex-shrink p-2">
        <Toolbar />
      </div>
      <div className="flex-grow bg-white m-5">
        <Alphatab tex="true" tracks="all" />
      </div>
      <div className="flex-shrink bg-white m-5">
        <FretboardInteractive />
      </div>
    </BeatsProvider>
  </main>
);

export default App;
