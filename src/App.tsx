import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
import Onboarding from "./pages/Onboarding"
import Home from "./pages/Home"
import Player from "./pages/Player"
import Bookmarks from "./pages/Bookmarks"
import Settings from "./pages/Settings"
import Header from "./components/Header"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/player" element={<Player />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App

