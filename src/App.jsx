import AlphaTab from "./Alphatab.jsx"
import { Fretboard } from "./Fretboard.jsx"

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-red-300">
      <div className="flex-grow bg-white m-5">
        <AlphaTab />
      </div>
      <div className="flex-shrink bg-white m-5">
        <Fretboard />
      </div>
    </div>
  )
}

export default App
