import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store"
import { toggleDarkMode } from "../store/themeSlice"

const Settings: React.FC = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <div className={`settings ${isDarkMode ? "dark" : ""}`}>
      <h2>Settings</h2>
      <div>
        <label htmlFor="darkMode">Dark Mode</label>
        <input id="darkMode" type="checkbox" checked={isDarkMode} onChange={handleToggleDarkMode} />
      </div>
    </div>
  )
}

export default Settings

