"use client";

import { useAudioPlayer } from "@/lib/AudioPlayerContext";
import { Track } from "@/types";
import Image from "next/image";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function MusicGrid({ tracks }: { tracks: Track[] }) {
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = useAudioPlayer();

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
    }
  };

  const isActive = (track: Track) => currentTrack?.id === track.id;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tracks.map((track) => (
        <button
          key={track.id}
          onClick={() => handlePlay(track)}
          className="group text-left"
        >
          <div className={`relative aspect-square rounded overflow-hidden mb-4 bg-white/5 ${isActive(track) ? "ring-1 ring-white/30" : ""}`}>
            <Image
              src={track.coverImageUrl}
              alt={track.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
              <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-black/40">
                {isActive(track) && isPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
            {isActive(track) && isPlaying && (
              <div className="absolute bottom-2 left-2 flex gap-0.5 items-end">
                <span className="w-1 bg-white rounded-full animate-pulse" style={{ height: "12px" }} />
                <span className="w-1 bg-white rounded-full animate-pulse" style={{ height: "8px", animationDelay: "0.1s" }} />
                <span className="w-1 bg-white rounded-full animate-pulse" style={{ height: "14px", animationDelay: "0.2s" }} />
              </div>
            )}
          </div>
          <h3 className={`text-sm font-medium leading-snug mb-1 transition-colors ${isActive(track) ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
            {track.title}
          </h3>
          <p className="text-xs text-white/35">{track.albumTitle}</p>
          <p className="text-xs text-white/25 mt-1">{track.genre} · {track.duration}</p>
        </button>
      ))}
    </div>
  );
}
