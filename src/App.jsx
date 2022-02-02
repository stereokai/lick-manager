import AlphaTab from './Alphatab.jsx';
import './App.css';
import { Fretboard } from './Fretboard.jsx';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AlphaTab />
        <Fretboard />
      </header>
    </div>
  )
}

export default App
