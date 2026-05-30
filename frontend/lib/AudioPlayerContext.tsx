"use client";

import { Track } from "@/types";
import { createContext, useContext, useState } from "react";

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (v: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  setCurrentTrack: () => {},
  setIsPlaying: () => {},
});

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioPlayerContext.Provider value={{ currentTrack, isPlaying, setCurrentTrack, setIsPlaying }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayer = () => useContext(AudioPlayerContext);
