import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "http://localhost:5000/api/bookmarks"

interface Bookmark {
  _id: string
  documentName: string
  position: number
  createdAt: string
}

interface BookmarksState {
  bookmarks: Bookmark[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: BookmarksState = {
  bookmarks: [],
  status: "idle",
  error: null,
}

export const fetchBookmarks = createAsyncThunk("bookmarks/fetchBookmarks", async () => {
  const response = await axios.get(API_URL)
  return response.data
})

export const addBookmark = createAsyncThunk(
  "bookmarks/addBookmark",
  async (bookmark: Omit<Bookmark, "_id" | "createdAt">) => {
    const response = await axios.post(API_URL, bookmark)
    return response.data
  },
)

export const updateBookmark = createAsyncThunk("bookmarks/updateBookmark", async (bookmark: Bookmark) => {
  const response = await axios.patch(`${API_URL}/${bookmark._id}`, bookmark)
  return response.data
})

export const deleteBookmark = createAsyncThunk("bookmarks/deleteBookmark", async (id: string) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
})

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchBookmarks.fulfilled, (state, action: PayloadAction<Bookmark[]>) => {
        state.status = "succeeded"
        state.bookmarks = action.payload
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      .addCase(addBookmark.fulfilled, (state, action: PayloadAction<Bookmark>) => {
        state.bookmarks.push(action.payload)
      })
      .addCase(updateBookmark.fulfilled, (state, action: PayloadAction<Bookmark>) => {
        const index = state.bookmarks.findIndex((bookmark) => bookmark._id === action.payload._id)
        if (index !== -1) {
          state.bookmarks[index] = action.payload
        }
      })
      .addCase(deleteBookmark.fulfilled, (state, action: PayloadAction<string>) => {
        state.bookmarks = state.bookmarks.filter((bookmark) => bookmark._id !== action.payload)
      })
  },
})

export default bookmarksSlice.reducer

