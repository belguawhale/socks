import React from 'react';

interface TempoSliderProps {
    tempo: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TempoSlider: React.FC<TempoSliderProps> = ({ tempo, onChange }) => (
    <div className="slider-group">
        <label htmlFor="tempo-slider">Tempo: {tempo} BPM</label>
        <input
            id="tempo-slider"
            type="range"
            step="5"
            min="120"
            max="240"
            value={tempo}
            onChange={onChange}
            className="slider tempo-slider"
        />
    </div>
);

export default TempoSlider; 