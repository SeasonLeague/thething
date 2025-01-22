import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    id: 1,
    title: "Welcome to Document Reader",
    description: "Transform your documents into audio with ease.",
    image: "https://api.unsplash.com/photos/random/800x600?document",
  },
  {
    id: 2,
    title: "Upload Any Document",
    description: "Support for PDF, DOCX, and TXT files.",
    image: "https://api.unsplash.com/photos/random/800x600?upload",
  },
  {
    id: 3,
    title: "Listen On-the-Go",
    description: "Convert your documents to speech and listen anywhere.",
    image: "https://api.unsplash.com/photos/random/800x600?listening",
  },
]

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const handleSkip = () => {
    navigate("/home")
  }

  return (
    <div className="onboarding-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="onboarding-slide"
        >
          <img
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            className="onboarding-image"
          />
          <div className="onboarding-content">
            <h2>{slides[currentSlide].title}</h2>
            <p>{slides[currentSlide].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="onboarding-navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <button className="skip-button" onClick={handleSkip}>
        Skip
      </button>
    </div>
  )
}

export default Onboarding

