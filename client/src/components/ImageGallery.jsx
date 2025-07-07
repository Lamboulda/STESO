import { useState } from "react"

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="gallery">
      <button className="arrow left" onClick={prevSlide} aria-label="Previous slide">
        &lt;
      </button>

      <img src={images[currentIndex]} alt={`gallery-${currentIndex}`} className="gallery-image" />

      <button className="arrow right" onClick={nextSlide} aria-label="Next slide">
        &gt;
      </button>
    </div>
  )
}

export default ImageGallery