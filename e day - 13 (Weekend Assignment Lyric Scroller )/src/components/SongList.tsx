import { Music, Plus } from 'lucide-react'
import { useState } from 'react'
import type { Song } from '../types/song'
import SongCard from './SongCard'
import NewSongDialog from './NewSongDialog'

interface SongListProps {
  songs: Song[]
  sidebarMode: boolean
  onSelect: (song: Song) => void
  onAddSong: (song: Song) => void
}

export default function SongList({ songs, sidebarMode, onSelect, onAddSong }: SongListProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSave = (song: Song) => {
    onAddSong(song)
    setDialogOpen(false)
  }

  return (
    <div
      className={
        sidebarMode
          ? 'fixed left-0 top-0 z-[1000] flex h-screen w-[260px] flex-col overflow-y-auto bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-6 shadow-[4px_0_20px_rgba(0,0,0,0.4)] max-lg:origin-top max-lg:scale-100 lg:origin-top lg:scale-100 max-md:hidden'
          : 'mx-auto w-full max-w-[500px] lg:origin-top lg:scale-150'
      }
    >
      <h1 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
        <Music size={22} />
        Choose a Song
      </h1>

      <div>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onSelect={onSelect} />
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-1.5 rounded-md bg-accent px-5 py-2 font-semibold text-black hover:bg-accent-hover"
        >
          <Plus size={18} />
          New song
        </button>
      </div>

      <NewSongDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleSave} />
    </div>
  )
}
