import type { LyricLine } from '../types/song'

// Matches "m:ss rest of line" or "seconds rest of line"
const TIME_PATTERN = /^(\d+):([0-5]?\d)\s+(.+)$|^(\d+(?:\.\d+)?)\s+(.+)$/

export function parseLyricsInput(raw: string): LyricLine[] {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  const result: LyricLine[] = []
  let lastTime = -4

  lines.forEach((line) => {
    const match = line.match(TIME_PATTERN)
    let time: number
    let text: string

    if (match) {
      if (match[1] !== undefined) {
        time = parseInt(match[1], 10) * 60 + parseInt(match[2], 10)
        text = match[3]
      } else {
        time = parseFloat(match[4])
        text = match[5]
      }
    } else {
      time = lastTime + 4
      text = line
    }

    lastTime = time
    result.push({ time, text })
  })

  return result
}
