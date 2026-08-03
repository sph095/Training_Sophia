import { useCallback, useState } from 'react'
import type { Song } from '../types/song'

const CUSTOM_SONGS_KEY = 'lyricsScrollerCustomSongs'

function loadCustomSongs(): Song[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SONGS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('Failed to load custom songs from storage:', e)
    return []
  }
}

function persistCustomSongs(list: Song[]): void {
  try {
    localStorage.setItem(CUSTOM_SONGS_KEY, JSON.stringify(list))
  } catch (e) {
    console.error('Failed to save custom songs to storage:', e)
    alert('Could not save the song to local storage (it will still work for this session).')
  }
}

export function useCustomSongs() {
  const [customSongs, setCustomSongs] = useState<Song[]>(() => loadCustomSongs())

  const addCustomSong = useCallback((song: Song) => {
    setCustomSongs((prev) => {
      const next = [...prev, song]
      persistCustomSongs(next)
      return next
    })
  }, [])

  return { customSongs, addCustomSong }
}
