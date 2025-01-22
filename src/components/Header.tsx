import type React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store"

const Header: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  return (
    <header className={`header ${isDarkMode ? "dark" : ""}`}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bookmarks">Bookmarks</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

