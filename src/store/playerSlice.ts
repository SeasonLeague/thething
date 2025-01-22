import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PlayerState {
  isPlaying: boolean
  currentPosition: number
  duration: number
  speed: number
  currentDocument: string | null
  documentContent: string | null
  audioUrl: string | null
}

const initialState: PlayerState = {
  isPlaying: false,
  currentPosition: 0,
  duration: 0,
  speed: 1,
  currentDocument: null,
  documentContent: null,
  audioUrl: null,
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setCurrentPosition: (state, action: PayloadAction<number>) => {
      state.currentPosition = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload
    },
    setCurrentDocument: (state, action: PayloadAction<string | null>) => {
      state.currentDocument = action.payload
    },
    setDocumentContent: (state, action: PayloadAction<string | null>) => {
      state.documentContent = action.payload
    },
    setAudioUrl: (state, action: PayloadAction<string | null>) => {
      state.audioUrl = action.payload
    },
  },
})

export const {
  setIsPlaying,
  setCurrentPosition,
  setDuration,
  setSpeed,
  setCurrentDocument,
  setDocumentContent,
  setAudioUrl,
} = playerSlice.actions
export default playerSlice.reducer

