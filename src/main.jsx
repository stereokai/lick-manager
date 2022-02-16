import LickEditor from "@/components/LickEditor.jsx";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Licks from "./routes/Licks.jsx";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="lick" element={<Navigate to="/lick/new" />} />
          <Route path="lick/:lickId" element={<LickEditor />} />
          <Route path="lick/new" element={<LickEditor />} />
          <Route index element={<Navigate to="/lick/new" />} />
        </Route>
        <Route path="licks" element={<Licks />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
