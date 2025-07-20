import React from 'react';

interface PlayPauseButtonProps {
    isPlaying: boolean;
    isLoading: boolean;
    onClick: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, isLoading, onClick }) => (
    <button
        className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'} ${isLoading ? 'loading' : ''}`}
        onClick={onClick}
        disabled={isLoading}
    >
        {isLoading ? '⏳' : (isPlaying ? '⏸️' : '▶️')}
    </button>
);

export default PlayPauseButton; 