import { Link, Outlet } from "react-router-dom";
import "./App.css";

const App = () => (
  <main className="flex flex-col min-h-screen bg-red-300">
    <nav className="flex p-3">
      <Link className="mx-3" to="/">
        Editor
      </Link>
      <Link className="mx-3" to="/licks">
        {"Go to lick library >"}
      </Link>
    </nav>
    <Outlet />
  </main>
);

export default App;
