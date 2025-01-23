import axios from "axios"

const API_URL = "https://api.elevenlabs.io/v1"
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY

// https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb (George Voice)
  
export async function textToSpeech(text: string, voiceId = "JBFqnCBsd6RMkjVDRZzb"): Promise<string> {
  try {
      // Add more detailed error logging
    console.log("Attempting to generate speech with:", {
      apiUrl: `${API_URL}/text-to-speech/${voiceId}`,
      textLength: text.length,
      voiceId
    })
  
    const response = await axios.post(
      `${API_URL}/text-to-speech/${voiceId}`,
      {
        text: text, 
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          "Accept": "audio/mpeg", // Specify expected response type
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        responseType: "blob"
      },
    )
  
    return URL.createObjectURL(response.data)
  } catch (error) {
      // More comprehensive error logging
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      })
    } else {
      console.error("Unexpected Error:", error)
    }
    throw new Error("Failed to generate speech")
  }
  }

