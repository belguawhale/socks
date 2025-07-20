import React from 'react';
import './MusicPlayer.css';
import PlayPauseButton from './controls/PlayPauseButton';
import VolumeSlider from './controls/VolumeSlider';
import TempoSlider from './controls/TempoSlider';

interface MusicPlayerProps {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  tempo: number;
  onTogglePlayPause: () => void;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTempoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  isLoading,
  volume,
  tempo,
  onTogglePlayPause,
  onVolumeChange,
  onTempoChange
}) => {
  return (
    <div className="music-player">
      <div className="player-header">
        <h2>My Momma Don't Wear No Socks</h2>
      </div>
      <div className="player-controls">
        <PlayPauseButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          onClick={onTogglePlayPause}
        />
      </div>
      <div className="player-sliders">
        <VolumeSlider volume={volume} onChange={onVolumeChange} />
        <TempoSlider tempo={tempo} onChange={onTempoChange} />
      </div>
    </div>
  );
};

export default MusicPlayer;