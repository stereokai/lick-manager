import { db } from "@/db.js";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useMemo, useReducer } from "react";
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
  const licks = useLiveQuery(() => db.licks.toArray());

  return (
    <main className="p-4 bg-sky-400">
      <ul>
        {licks?.map((lick) => (
          <li key={lick.id}>{lick.beats}</li>
        ))}
      </ul>
    </main>
  );
}
