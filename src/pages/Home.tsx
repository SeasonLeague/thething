import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentDocument, setDocumentContent, setAudioUrl} from "../store/playerSlice"
import type { RootState } from "../store"
import { parseDocument } from "../utils/documentParser"
import { textToSpeech } from "../utils/elevenlabs"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)

    try {
      const text = await parseDocument(file)
      dispatch(setCurrentDocument(file.name))
      dispatch(setDocumentContent(text))

      // Generate audio in the background
      try {
        const audioUrl = await textToSpeech(text)
        dispatch(setAudioUrl(audioUrl))
      } catch (audioError) {
        console.error("Audio generation failed:", audioError)
        alert("Could not generate audio. The document will be displayed without sound.")
      }

      navigate("/player")
    } catch (error) {
      console.error("Error processing document:", error)
      alert("Error processing document. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`home ${isDarkMode ? "dark" : ""}`}>
      <h1>The-Thing</h1>
      <input type="file" accept=".txt,.docx,.pdf" onChange={handleFileUpload} disabled={isLoading} />
      {isLoading && <p>Processing document...</p>}
    </div>
  )
}

export default Home