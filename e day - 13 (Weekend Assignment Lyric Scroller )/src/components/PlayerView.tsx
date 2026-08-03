import { ArrowLeft, Pause, Play } from 'lucide-react'
import type { Song } from '../types/song'
import { usePlayback } from '../hooks/usePlayback'
import LyricsPane from './LyricsPane'

interface PlayerViewProps {
  song: Song
  onBack: () => void
}

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
  const secs = Math.floor(totalSeconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function PlayerView({ song, onBack }: PlayerViewProps) {
  const { isPlaying, elapsed, currentLineIndex, ended, progress, togglePlay, seekToProgress, seekToLine } =
    usePlayback(song)

  return (
    <div className="mx-auto w-full max-w-[500px]">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 rounded-md border border-accent bg-transparent px-4 py-1.5 text-sm text-accent hover:bg-accent-soft"
      >
        <ArrowLeft size={16} />
        Back to songs
      </button>

      <div className="mb-2 text-sm text-gray-500">
        Now playing: <span className="text-accent">{song.title} — {song.artist}</span>
      </div>

      {ended && (
        <div className="mb-2 font-semibold text-accent">🎵 Song ended</div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-end gap-8">
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 rounded-md bg-accent px-5 py-2 font-semibold text-black hover:bg-accent-hover"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span className="font-mono text-base text-gray-400">{formatTime(elapsed)}</span>
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={progress}
        onChange={(e) => seekToProgress(Number(e.target.value))}
        className="accent-accent mb-6 w-full"
      />

      <LyricsPane song={song} currentLineIndex={currentLineIndex} onLineClick={seekToLine} />
    </div>
  )
}
