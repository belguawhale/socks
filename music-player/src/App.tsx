import MusicPlayer from './components/MusicPlayer'
import './App.css'
import song from './data/song'

function App() {
  return (
    <div className="app">
      <MusicPlayer songData={song} />
    </div>
  )
}

export default App
