import React from 'react';

interface VolumeSliderProps {
    volume: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ volume, onChange }) => (
    <div className="slider-group">
        <label htmlFor="volume-slider">Volume: {volume}%</label>
        <input
            id="volume-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onChange}
            className="slider volume-slider"
        />
    </div>
);

export default VolumeSlider; 