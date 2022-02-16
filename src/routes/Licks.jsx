import { Fretboard } from "@/components/Fretboard/Fretboard.jsx";
import { getLicks } from "@/db.js";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useMemo, useReducer } from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
const LicksContext = createContext();

export const LicksActions = {};

export const licksReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, "new"];
  }
};

export const LicksProvider = (props) => {
  const [state, dispatch] = useReducer(licksReducer, []);
  const value = useMemo(() => [state, dispatch], [state]);
  return <LicksContext.Provider value={value} {...props} />;
};

export const useLicks = () => {
  const context = useContext(LicksContext);
  if (!context) {
    throw new Error(`useLicks must be used within a LicksProvider`);
  }
  const [state, licksDispatch] = context;

  return {
    state,
    licksDispatch,
  };
};

export default function Licks() {
  const licks = useLiveQuery(() => getLicks());
  const navigate = useNavigate();
  const navType = useNavigationType();

  if (!licks) return null;
  return (
    <main className="p-4 bg-sky-400">
      {navType === "PUSH" ? (
        <Link className="m-3" to={-1}>
          {"< Editor"}
        </Link>
      ) : (
        <Link className="m-3" to="/lick">
          {"< Editor"}
        </Link>
      )}
      <ul>
        {licks?.map((lick) => (
          <li
            className="lick"
            key={lick.id}
            onDoubleClick={() => navigate(`/lick/${lick.id}`)}
          >
            <Fretboard beats={lick.beats} />
          </li>
        ))}
      </ul>
    </main>
  );
}
