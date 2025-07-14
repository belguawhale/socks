import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import SoundFont from 'soundfont-player';
import './MusicPlayer.css';

interface MusicPlayerProps {
  audioSrc?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [tempo, setTempo] = useState(120);
  const pianoRef = useRef<any>(null);
  const partRef = useRef<Tone.Part | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const initializePiano = async () => {
      try {
        // Don't start Tone.js here - wait for user interaction
        const audioContext = Tone.getContext().rawContext;
        pianoRef.current = await SoundFont.instrument(audioContext, 'acoustic_grand_piano');
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load piano soundfont:', error);
        setIsLoading(false);
      }
    };

    initializePiano();

    return () => {
      partRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!pianoRef.current || isLoading) return;

    // Recreate the musical part when volume changes
    partRef.current?.dispose();
    partRef.current = new Tone.Part((time, note) => {
      if (pianoRef.current) {
        pianoRef.current.play(note.note, time, { duration: 0.5, gain: volume / 100 });
      }
    }, twinkleMelody);

    partRef.current.loop = true;
    partRef.current.loopEnd = '8m';

  }, [volume, isLoading]);

  const togglePlayPause = async () => {
    if (isLoading || !pianoRef.current || !partRef.current) return;

    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    if (isPlaying) {
      Tone.getTransport().stop();
      partRef.current.stop();
    } else {
      partRef.current.start(0);
      Tone.getTransport().start();
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(event.target.value));
  };

  const handleTempoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempo = parseInt(event.target.value);
    Tone.getTransport().bpm.value = tempo;
    setTempo(tempo);
  };

  return (
    <div className="music-player">
      <div className="player-header">
        <h2>Music Player</h2>
      </div>

      <div className="player-controls">
        <button
          className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'} ${isLoading ? 'loading' : ''}`}
          onClick={togglePlayPause}
          disabled={isLoading}
        >
          {isLoading ? '⏳' : (isPlaying ? '⏸️' : '▶️')}
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
          <label htmlFor="tempo-slider">Tempo: {tempo} BPM</label>
          <input
            id="tempo-slider"
            type="range"
            min="60"
            max="180"
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