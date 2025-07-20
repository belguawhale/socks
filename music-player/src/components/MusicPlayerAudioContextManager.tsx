import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import SoundFont from 'soundfont-player';
import MusicPlayer from './MusicPlayer';
import { type SongEvent } from '../data/song';
import { INITIAL_TEMPO, INITIAL_VOLUME } from '../utils/constants';

export interface MusicPlayerAudioContextManagerProps {
    songData: SongEvent[];
}

const MusicPlayerAudioContextManager: React.FC<MusicPlayerAudioContextManagerProps> = ({ songData }) => {
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
                const audioContext = Tone.getContext().rawContext as AudioContext;
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
        partRef.current?.dispose();
        partRef.current = new Tone.Part((time, event: SongEvent) => {
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
        <MusicPlayer
            isPlaying={isPlaying}
            isLoading={isLoading}
            volume={volume}
            tempo={tempo}
            onTogglePlayPause={togglePlayPause}
            onVolumeChange={handleVolumeChange}
            onTempoChange={handleTempoChange}
        />
    );
};

export default MusicPlayerAudioContextManager; 