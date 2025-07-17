// Song arrangement: bass and melody only
export interface SongEvent {
    note: string;
    time: number;
    type: 'bass' | 'melody';
    duration: number;
    gain: number;
}

const twinkleArrangement: SongEvent[] = [
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

const mommaDontWearNoSocksArrangement: SongEvent[] = [
    { note: 'C3', time: 0, type: 'bass', duration: 1, gain: 1.0 },
    { note: 'C4', time: 0.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'E4', time: 0.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'G4', time: 0.5, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'A2', time: 1, type: 'bass', duration: 1, gain: 1.0 },
    { note: 'A3', time: 1.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'C4', time: 1.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'E4', time: 1.5, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'D3', time: 2, type: 'bass', duration: 1, gain: 1.0 },
    { note: 'D4', time: 2.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'F4', time: 2.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'A4', time: 2.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'G2', time: 2.75, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'A2', time: 3.25, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'B2', time: 3.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'B3', time: 3.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'D4', time: 3.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'G4', time: 3.5, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'C3', time: 4, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'C4', time: 4.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'E4', time: 4.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'G4', time: 4.5, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'A2', time: 5, type: 'bass', duration: 1, gain: 1.0 },
    { note: 'A3', time: 5.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'C4', time: 5.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'E4', time: 5.5, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'D3', time: 6, type: 'bass', duration: 1, gain: 1.0 },
    { note: 'D4', time: 6.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'F4', time: 6.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'A4', time: 6.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'G2', time: 6.75, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'A2', time: 7.25, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'B2', time: 7.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'B3', time: 7.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'D4', time: 7.5, type: 'bass', duration: 0.5, gain: 1.0 },
    { note: 'G4', time: 7.5, type: 'bass', duration: 0.5, gain: 1.0 },

    { note: 'C3', time: 8, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'C4', time: 8, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'E4', time: 8, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'G4', time: 8, type: 'bass', duration: 0.25, gain: 1.0 },

    { note: 'G2', time: 11.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'G3', time: 11.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'A2', time: 11.5, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'A3', time: 11.5, type: 'bass', duration: 0.25, gain: 1.0 },

    { note: 'C3', time: 12, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'C4', time: 12, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'E4', time: 12, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'G4', time: 12, type: 'bass', duration: 0.25, gain: 1.0 },

    { note: 'G2', time: 15.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'G3', time: 15.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'A2', time: 15.5, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'A3', time: 15.5, type: 'bass', duration: 0.25, gain: 1.0 },

    { note: 'C3', time: 16, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'C4', time: 16, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'E4', time: 16, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'G4', time: 16, type: 'bass', duration: 0.25, gain: 1.0 },

    { note: 'G2', time: 19.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'G3', time: 19.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'A2', time: 19.5, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'A3', time: 19.5, type: 'bass', duration: 0.25, gain: 1.0 },

    { note: 'C3', time: 20, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'C4', time: 20, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'E4', time: 20, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'G4', time: 20, type: 'bass', duration: 0.25, gain: 1.0 },

    { note: 'G2', time: 23.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'G3', time: 23.333, type: 'bass', duration: 0.166, gain: 1.0 },
    { note: 'A2', time: 23.5, type: 'bass', duration: 0.25, gain: 1.0 },
    { note: 'A3', time: 23.5, type: 'bass', duration: 0.25, gain: 1.0 },
];

const cMajorScale: SongEvent[] = [
    { note: 'C2', time: 0, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'D2', time: 0.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'E2', time: 1, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'F2', time: 1.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'G2', time: 2, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'A2', time: 2.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'B2', time: 3, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'C3', time: 3.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'D3', time: 4, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'E3', time: 4.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'F3', time: 5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'G3', time: 5.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'A3', time: 6, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'B3', time: 6.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'C4', time: 7, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'D4', time: 7.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'E4', time: 8, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'F4', time: 8.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'G4', time: 9, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'A4', time: 9.5, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'B4', time: 10, type: 'bass', duration: 0.5, gain: 0.7 },
    { note: 'C5', time: 10.5, type: 'bass', duration: 0.5, gain: 0.7 },
];

// export default twinkleArrangement;
// export default cMajorScale;

export default mommaDontWearNoSocksArrangement; 