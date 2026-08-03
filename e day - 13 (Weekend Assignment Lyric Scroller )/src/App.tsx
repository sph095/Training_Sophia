import { useMemo, useState } from 'react'
import type { Song } from './types/song'
import { defaultSongs } from './data/songs'
import { useCustomSongs } from './hooks/useCustomSongs'
import SongList from './components/SongList'
import PlayerView from './components/PlayerView'

export default function App() {
  const { customSongs, addCustomSong } = useCustomSongs()
  const songs = useMemo(() => [...defaultSongs, ...customSongs], [customSongs])

  const [currentSong, setCurrentSong] = useState<Song | null>(null)

  const handleSelect = (song: Song) => setCurrentSong(song)
  const handleBack = () => setCurrentSong(null)

  const sidebarMode = currentSong !== null

  return (
    <div className="flex min-h-screen flex-col items-center bg-base p-8 text-gray-200">
      <SongList
        songs={songs}
        sidebarMode={sidebarMode}
        onSelect={handleSelect}
        onAddSong={addCustomSong}
      />
      {currentSong && (
        <div className="w-full lg:pl-[260px]">
          <PlayerView song={currentSong} onBack={handleBack} />
        </div>
      )}
    </div>
  )
}
