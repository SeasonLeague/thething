import type React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../store"
import { fetchBookmarks, deleteBookmark } from "../store/bookmarksSlice"
import { setCurrentPosition } from "../store/playerSlice"
import type { AppDispatch } from "../store"

const Bookmarks: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { bookmarks, status, error } = useSelector((state: RootState) => state.bookmarks)
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookmarks())
    }
  }, [status, dispatch])

  const handleBookmarkClick = (bookmark: { position: number }) => {
    dispatch(setCurrentPosition(bookmark.position))
    navigate("/player")
  }

  const handleRemoveBookmark = (id: string) => {
    dispatch(deleteBookmark(id))
  }

  if (status === "loading") {
    return <div>Loading bookmarks...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  return (
    <div className={`bookmarks ${isDarkMode ? "dark" : ""}`}>
      <h2>Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark._id}>
              <span onClick={() => handleBookmarkClick(bookmark)}>
                {bookmark.documentName} - {formatTime(bookmark.position)}
              </span>
              <button onClick={() => handleRemoveBookmark(bookmark._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default Bookmarks

