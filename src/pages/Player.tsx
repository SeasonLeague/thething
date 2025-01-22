import type React from "react"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { setIsPlaying, setCurrentPosition, setDuration, setSpeed } from "../store/playerSlice"
import { addBookmark } from "../store/bookmarksSlice"
import { PlayIcon, PauseIcon, BookmarkIcon } from "@heroicons/react/solid"

const Player: React.FC = () => {
  const dispatch = useDispatch()
  const { isPlaying, currentPosition, duration, speed, currentDocument, documentContent, audioUrl } = useSelector(
    (state: RootState) => state.player,
  )
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
    }
  }, [speed])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying))
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = Number.parseFloat(e.target.value)
    dispatch(setCurrentPosition(newPosition))
    if (audioRef.current) {
      audioRef.current.currentTime = newPosition
    }
  }

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number.parseFloat(e.target.value)
    dispatch(setSpeed(newSpeed))
  }

  const handleAddBookmark = () => {
    if (currentDocument) {
      dispatch(
        addBookmark({
          documentName: currentDocument,
          position: currentPosition,
        }),
      )
    }
  }

  return (
    <div className={`player-container ${isDarkMode ? "dark" : ""}`}>
      <div className="glassmorphism-player">
        <h2 className="text-2xl font-bold mb-4">{currentDocument}</h2>
        <div className="document-content mb-4 max-h-60 overflow-y-auto">
          <p>{documentContent}</p>
        </div>
        <audio
          ref={audioRef}
          src={audioUrl || ""}
          onTimeUpdate={() => dispatch(setCurrentPosition(audioRef.current?.currentTime || 0))}
          onLoadedMetadata={() => dispatch(setDuration(audioRef.current?.duration || 0))}
        />
        <div className="controls">
          <button onClick={handlePlayPause} className="play-pause-btn">
            {isPlaying ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="h-8 w-8" />}
          </button>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentPosition}
            onChange={handleSeek}
            className="seek-bar"
          />
          <span className="time-display">
            {formatTime(currentPosition)} / {formatTime(duration)}
          </span>
        </div>
        <div className="speed-control">
          <label htmlFor="speed" className="speed-label">
            Speed: {speed.toFixed(1)}x
          </label>
          <input
            id="speed"
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={speed}
            onChange={handleSpeedChange}
            className="speed-slider"
          />
        </div>
        <button onClick={handleAddBookmark} className="bookmark-btn">
          <BookmarkIcon className="h-6 w-6" />
          Add Bookmark
        </button>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default Player

