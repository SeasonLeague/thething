import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bookmarkRoutes from "./routes/bookmarkRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error))

app.use("/api/bookmarks", bookmarkRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

