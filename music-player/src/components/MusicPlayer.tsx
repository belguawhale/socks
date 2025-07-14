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
  const volumeRef = useRef(50);
  const [tempo, setTempo] = useState(120);
  const pianoRef = useRef<SoundFont.Player>(null);
  const partRef = useRef<Tone.Part | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const endEventRef = useRef<number | null>(null);

  // Combined arrangement: bass and melody only
  const twinkleArrangement = [
    // Beat 0
    { note: 'C2', time: 0, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'C4', time: 0, type: 'melody', duration: 0.5, gain: 1.0 },
    { note: 'C4', time: 0.5, type: 'melody', duration: 0.5, gain: 1.0 },

    // Beat 1
    { note: 'E2', time: 1, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'G4', time: 1, type: 'melody', duration: 0.5, gain: 1.0 },
    { note: 'G4', time: 1.5, type: 'melody', duration: 0.5, gain: 1.0 },

    // Beat 2
    { note: 'F2', time: 2, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'A4', time: 2, type: 'melody', duration: 0.5, gain: 1.0 },
    { note: 'A4', time: 2.5, type: 'melody', duration: 0.5, gain: 1.0 },

    // Beat 3
    { note: 'E2', time: 3, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'G4', time: 3, type: 'melody', duration: 1, gain: 1.0 },

    // Beat 4
    { note: 'D2', time: 4, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'F4', time: 4, type: 'melody', duration: 0.5, gain: 1.0 },
    { note: 'F4', time: 4.5, type: 'melody', duration: 0.5, gain: 1.0 },

    // Beat 5
    { note: 'C2', time: 5, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'E4', time: 5, type: 'melody', duration: 0.5, gain: 1.0 },
    { note: 'E4', time: 5.5, type: 'melody', duration: 0.5, gain: 1.0 },

    // Beat 6
    { note: 'G2', time: 6, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'D4', time: 6, type: 'melody', duration: 0.5, gain: 1.0 },
    { note: 'D4', time: 6.5, type: 'melody', duration: 0.5, gain: 1.0 },

    // Beat 7
    { note: 'C2', time: 7, type: 'bass', duration: 1, gain: 0.7 },
    { note: 'C4', time: 7, type: 'melody', duration: 1, gain: 1.0 },
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
      if (endEventRef.current !== null) {
        Tone.getTransport().clear(endEventRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!pianoRef.current || isLoading) return;

    // Dispose existing part
    partRef.current?.dispose();

    // Create single part for the entire arrangement
    partRef.current = new Tone.Part((time, event) => {
      console.log("Tone.Part callback", time, event)
      if (pianoRef.current) {
        const adjustedGain = (volumeRef.current / 100) * event.gain;
        pianoRef.current.play(event.note, time, {
          duration: event.duration,
          gain: adjustedGain
        });
      }
    }, twinkleArrangement);

    partRef.current.loop = false;

  }, [isLoading]);

  const togglePlayPause = async () => {
    if (isLoading || !pianoRef.current || !partRef.current) return;

    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    if (isPlaying) {
      Tone.getTransport().stop();
      partRef.current.stop();
      if (endEventRef.current !== null) {
        Tone.getTransport().clear(endEventRef.current);
        endEventRef.current = null;
      }
      setIsPlaying(false);
    } else {
      partRef.current.start(0);

      const songEndTime = Math.max(...twinkleArrangement.map(event => event.time + event.duration));
      endEventRef.current = Tone.getTransport().schedule((time) => {
        // Calculate song duration dynamically from arrangement
        console.log("end of playing");
        setIsPlaying(false);
        Tone.getTransport().stop();
        endEventRef.current = null;
      }, songEndTime);

      Tone.getTransport().start();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
    volumeRef.current = newVolume;
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