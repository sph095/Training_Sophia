import { useEffect, useRef } from 'react'
import type { Song } from '../types/song'

interface LyricsPaneProps {
  song: Song
  currentLineIndex: number
  onLineClick: (index: number) => void
}

export default function LyricsPane({ song, currentLineIndex, onLineClick }: LyricsPaneProps) {
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [currentLineIndex])

  return (
    <div className="max-h-[60vh] overflow-y-auto rounded-[10px] bg-panel p-6 leading-[1.8]">
      {song.lyrics.map((line, index) => {
        const isActive = index === currentLineIndex
        return (
          <div
            key={index}
            ref={isActive ? activeRef : null}
            onClick={() => onLineClick(index)}
            className={`cursor-pointer rounded px-2 py-1 transition-colors duration-150 ${
              isActive ? 'bg-accent-soft font-semibold text-white' : 'text-gray-500'
            }`}
          >
            {line.text}
          </div>
        )
      })}
    </div>
  )
}
