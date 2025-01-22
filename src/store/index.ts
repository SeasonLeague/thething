import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./themeSlice"
import playerReducer from "./playerSlice"
import bookmarksReducer from "./bookmarksSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    player: playerReducer,
    bookmarks: bookmarksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

