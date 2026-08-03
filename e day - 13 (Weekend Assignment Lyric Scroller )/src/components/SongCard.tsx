import { ArrowRight } from 'lucide-react'
import type { Song } from '../types/song'

interface SongCardProps {
  song: Song
  onSelect: (song: Song) => void
}

export default function SongCard({ song, onSelect }: SongCardProps) {
  return (
    <div
      onClick={() => onSelect(song)}
      className="flex cursor-pointer items-center justify-between rounded-[10px] bg-panel px-6 py-4 mb-3 transition-colors hover:bg-panel2"
    >
      <div>
        <div className="text-[1.1rem] font-semibold">{song.title}</div>
        <div className="mt-1 text-sm text-gray-500">{song.artist}</div>
      </div>
      <ArrowRight className="text-accent" size={22} />
    </div>
  )
}
