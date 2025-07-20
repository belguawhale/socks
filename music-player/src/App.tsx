import './App.css'
import MusicPlayerAudioContextManager from './components/MusicPlayerAudioContextManager'
import song from './data/song'

function App() {
  return (
    <div className="app">
      <MusicPlayerAudioContextManager songData={song} />
    </div>
  )
}

export default App
