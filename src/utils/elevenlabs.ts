import axios from "axios"

const API_URL = "https://api.elevenlabs.io/v1"
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY

export async function textToSpeech(text: string, voiceId = "EXAVITQu4vr4xnSDxMaL"): Promise<string> {
  try {
    const response = await axios.post(
      `${API_URL}/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        responseType: "blob",
      },
    )

    return URL.createObjectURL(response.data)
  } catch (error) {
    console.error("Error generating speech:", error)
    throw new Error("Failed to generate speech")
  }
}

