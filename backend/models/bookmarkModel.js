import mongoose from "mongoose"

const bookmarkSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Bookmark = mongoose.model("Bookmark", bookmarkSchema)

export default Bookmark

