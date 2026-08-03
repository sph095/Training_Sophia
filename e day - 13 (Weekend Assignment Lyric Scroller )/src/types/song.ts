export interface LyricLine {
  /** Timestamp in seconds when this line becomes active */
  time: number
  text: string
}

export interface Song {
  id: string
  title: string
  artist: string
  lyrics: LyricLine[]
}
