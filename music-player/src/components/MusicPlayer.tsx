import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import SoundFont from 'soundfont-player';
import './MusicPlayer.css';
import { type SongEvent } from '../data/song';
import { INITIAL_TEMPO, INITIAL_VOLUME } from '../utils/constants';

interface MusicPlayerProps {
  songData: SongEvent[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const volumeRef = useRef(INITIAL_VOLUME);
  const [tempo, setTempo] = useState(INITIAL_TEMPO);
  const pianoRef = useRef<SoundFont.Player>(null);
  const partRef = useRef<Tone.Part | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    // Dispose existing part
    partRef.current?.dispose();

    // Create single part for the entire arrangement
    partRef.current = new Tone.Part((time, event: SongEvent) => {
      console.log("Tone.Part callback", time, event)
      if (pianoRef.current) {
        const adjustedGain = (volumeRef.current / 100) * event.gain;
        pianoRef.current.play(event.note, time, {
          duration: event.duration,
          gain: adjustedGain
        });
      }
    }, songData);

    partRef.current.loop = true;
    partRef.current.loopEnd = 24;

  }, [isLoading, songData]);

  const togglePlayPause = async () => {
    if (isLoading || !pianoRef.current || !partRef.current) return;

    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    if (isPlaying) {
      Tone.getTransport().stop();
      partRef.current.stop();
      setIsPlaying(false);
    } else {
      Tone.getTransport().bpm.value = tempo;
      partRef.current.start(0);
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
            step="5"
            min="120"
            max="240"
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