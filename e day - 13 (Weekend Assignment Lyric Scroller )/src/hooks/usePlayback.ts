import { useCallback, useEffect, useRef, useState } from 'react'
import type { Song } from '../types/song'

export function usePlayback(song: Song | null) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [ended, setEnded] = useState(false)

  const startTimeRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  const lastTime = song && song.lyrics.length > 0 ? song.lyrics[song.lyrics.length - 1].time : 1
  const progress = lastTime > 0 ? Math.min(elapsed / lastTime, 1) : 0

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const findLineIndex = useCallback(
    (time: number): number => {
      if (!song) return 0
      const lyrics = song.lyrics
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (time >= lyrics[i].time) return i
      }
      return 0
    },
    [song],
  )

  // Reset whenever the song changes
  useEffect(() => {
    clearTimer()
    setIsPlaying(false)
    setElapsed(0)
    setCurrentLineIndex(0)
    setEnded(false)
  }, [song, clearTimer])

  const tick = useCallback(() => {
    if (!song) return
    const newElapsed = (Date.now() - startTimeRef.current) / 1000
    const last = song.lyrics[song.lyrics.length - 1]

    if (newElapsed >= last.time) {
      setElapsed(last.time)
      setCurrentLineIndex(song.lyrics.length - 1)
      clearTimer()
      setIsPlaying(false)
      setEnded(true)
      return
    }

    setElapsed(newElapsed)
    const newIndex = findLineIndex(newElapsed)
    setCurrentLineIndex((prev) => (newIndex !== prev ? newIndex : prev))
  }, [song, clearTimer, findLineIndex])

  const play = useCallback(() => {
    if (!song) return
    startTimeRef.current = Date.now() - elapsed * 1000
    setIsPlaying(true)
    setEnded(false)
    clearTimer()
    timerRef.current = window.setInterval(tick, 100)
  }, [song, elapsed, clearTimer, tick])

  const pause = useCallback(() => {
    clearTimer()
    setIsPlaying(false)
  }, [clearTimer])

  const togglePlay = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const seekToTime = useCallback(
    (time: number) => {
      setElapsed(time)
      setCurrentLineIndex(findLineIndex(time))
      if (isPlaying) {
        startTimeRef.current = Date.now() - time * 1000
      }
    },
    [isPlaying, findLineIndex],
  )

  const seekToProgress = useCallback(
    (p: number) => {
      seekToTime(p * lastTime)
    },
    [seekToTime, lastTime],
  )

  const seekToLine = useCallback(
    (index: number) => {
      if (!song) return
      const line = song.lyrics[index]
      if (!line) return
      setCurrentLineIndex(index)
      seekToTime(line.time)
    },
    [song, seekToTime],
  )

  // Cleanup on unmount
  useEffect(() => clearTimer, [clearTimer])

  return {
    isPlaying,
    elapsed,
    currentLineIndex,
    ended,
    progress,
    togglePlay,
    seekToProgress,
    seekToLine,
  }
}
