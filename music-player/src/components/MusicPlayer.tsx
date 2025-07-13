import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import './MusicPlayer.css';

interface MusicPlayerProps {
  audioSrc?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [tempo, setTempo] = useState(100);
  const synthRef = useRef<Tone.Synth | null>(null);
  const partRef = useRef<Tone.Part | null>(null);

  // Twinkle Twinkle Little Star melody (C major)
  const twinkleMelody = [
    { note: 'C4', time: 0 },
    { note: 'C4', time: 0.5 },
    { note: 'G4', time: 1 },
    { note: 'G4', time: 1.5 },
    { note: 'A4', time: 2 },
    { note: 'A4', time: 2.5 },
    { note: 'G4', time: 3 },
    { note: 'F4', time: 4 },
    { note: 'F4', time: 4.5 },
    { note: 'E4', time: 5 },
    { note: 'E4', time: 5.5 },
    { note: 'D4', time: 6 },
    { note: 'D4', time: 6.5 },
    { note: 'C4', time: 7 },
  ];

  useEffect(() => {
    // Initialize Tone.js synth
    synthRef.current = new Tone.Synth().toDestination();
    
    // Create the musical part
    partRef.current = new Tone.Part((time, note) => {
      synthRef.current?.triggerAttackRelease(note.note, '4n', time);
    }, twinkleMelody);
    
    partRef.current.loop = true;
    partRef.current.loopEnd = '8m';

    return () => {
      synthRef.current?.dispose();
      partRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = Tone.gainToDb(volume / 100);
    }
  }, [volume]);

  useEffect(() => {
    if (partRef.current) {
      Tone.Transport.bpm.value = (tempo / 100) * 120; // Base tempo 120 BPM
    }
  }, [tempo]);

  const togglePlayPause = async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    if (isPlaying) {
      Tone.Transport.stop();
      partRef.current?.stop();
    } else {
      partRef.current?.start(0);
      Tone.Transport.start();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(event.target.value));
  };

  const handleTempoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(parseInt(event.target.value));
  };

  return (
    <div className="music-player">
      <div className="player-header">
        <h2>Music Player</h2>
      </div>
      
      <div className="player-controls">
        <button 
          className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'}`}
          onClick={togglePlayPause}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      <div className="player-sliders">
        <div className="slider-group">
          <label htmlFor="volume-slider">Volume: {volume}%</label>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="slider volume-slider"
          />
        </div>

        <div className="slider-group">
          <label htmlFor="tempo-slider">Tempo: {tempo}%</label>
          <input
            id="tempo-slider"
            type="range"
            min="50"
            max="200"
            value={tempo}
            onChange={handleTempoChange}
            className="slider tempo-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;