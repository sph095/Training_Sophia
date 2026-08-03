import { useEffect, useRef, useState } from 'react'
import type { Song } from '../types/song'
import { parseLyricsInput } from '../utils/parseLyrics'

interface NewSongDialogProps {
  open: boolean
  onClose: () => void
  onSave: (song: Song) => void
}

const LYRICS_PLACEHOLDER = `One lyric line per row.
Optionally start a line with m:ss to set its timing, e.g.:
0:00 (intro)
0:07 First line
Next line (auto-timed ~4s later if no timestamp)`

export default function NewSongDialog({ open, onClose, onSave }: NewSongDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [lyricsRaw, setLyricsRaw] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      setTitle('')
      setArtist('')
      setLyricsRaw('')
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [open])

  const handleSave = () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle || !lyricsRaw.trim()) {
      alert('Please enter at least a title and some lyrics.')
      return
    }

    const lyrics = parseLyricsInput(lyricsRaw)
    if (lyrics.length === 0) {
      alert('Could not read any lyric lines — please add at least one line.')
      return
    }

    const song: Song = {
      id: 'custom-' + Date.now(),
      title: trimmedTitle,
      artist: artist.trim() || 'Unknown Artist',
      lyrics,
    }

    onSave(song)
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed left-1/2 top-1/2 min-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl border-none bg-panel p-5 text-center text-gray-200 shadow-2xl backdrop:bg-black/50"
    >
      <label htmlFor="sTitle" className="mb-1 block text-left text-sm text-gray-400">
        Song Title
      </label>
      <input
        id="sTitle"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2.5 w-full rounded-md border border-gray-700 bg-base p-2.5 text-gray-200"
      />

      <label htmlFor="aName" className="mb-1 block text-left text-sm text-gray-400">
        Artist
      </label>
      <input
        id="aName"
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="mb-2.5 w-full rounded-md border border-gray-700 bg-base p-2.5 text-gray-200"
      />

      <label htmlFor="lyrics" className="mb-1 block text-left text-sm text-gray-400">
        Lyrics
      </label>
      <textarea
        id="lyrics"
        value={lyricsRaw}
        onChange={(e) => setLyricsRaw(e.target.value)}
        placeholder={LYRICS_PLACEHOLDER}
        className="mb-2.5 min-h-[120px] w-full resize-y rounded-md border border-gray-700 bg-base p-2.5 text-left font-mono text-[0.85rem] text-gray-200"
      />
      <div className="-mt-1.5 mb-3 text-left text-xs text-gray-600">
        Tip: prefix a line with m:ss to sync it exactly. Untimed lines are spaced 4s apart.
      </div>

      <button
        onClick={onClose}
        className="float-left rounded-md bg-accent px-5 py-2 font-semibold text-black hover:bg-accent-hover"
      >
        Close
      </button>
      <button
        onClick={handleSave}
        className="float-right rounded-md bg-accent px-5 py-2 font-semibold text-black hover:bg-accent-hover"
      >
        Save
      </button>
    </dialog>
  )
}
