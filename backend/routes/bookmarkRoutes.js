import express from "express"
import Bookmark from "../models/bookmarkModel.js"

const router = express.Router()

// Create a new bookmark
router.post("/", async (req, res) => {
  try {
    const bookmark = new Bookmark(req.body)
    await bookmark.save()
    res.status(201).json(bookmark)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all bookmarks
router.get("/", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find()
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update a bookmark
router.patch("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" })
    res.json(bookmark)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a bookmark
router.delete("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id)
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" })
    res.json({ message: "Bookmark deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

