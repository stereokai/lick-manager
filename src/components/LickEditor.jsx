import Alphatab from "@/components/Alphatab";
import { FretboardInteractive } from "@/components/Fretboard";
import Toolbar from "@/components/Toolbar.jsx";
import { BeatsProvider } from "@/routes/Beats.jsx";
import { useEffect } from "react";

export default function LickEditor() {
  useEffect(() => {
    document.title = "Lick Editor";
  }, []);

  return (
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
  );
}
