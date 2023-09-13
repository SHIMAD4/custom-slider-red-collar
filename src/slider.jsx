import { useEffect, useRef, useState } from 'react';
import dataSlider from './dataSlider';
import SliderButton from './sliderButton';

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1)
  const [slidePos, setSlidePos] = useState(0)
  const intervalRef = useRef(null)
  let translatePos = 400

  const calculateTranslatePos = () => {
    const imageWidth = document.getElementById('1').width
    translatePos = imageWidth
  }

  const startInterval = () => {
    calculateTranslatePos()
    intervalRef.current = setInterval(() => {
      if (slideIndex !== dataSlider.length) {
        setSlideIndex(slideIndex + 1)
        setSlidePos(slidePos - translatePos)
      } else {
        setSlideIndex(1)
        setSlidePos(0)
      }
    }, 2500)
  }

  const clearIntervalFunc = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    startInterval()
    window.addEventListener('resize', calculateTranslatePos)
    return () => {
      clearIntervalFunc()
      window.removeEventListener('resize', calculateTranslatePos)
    }
  })

  const nextSlide = () => {
    calculateTranslatePos()
    clearIntervalFunc()
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1)
      setSlidePos(slidePos - translatePos)
    } else {
      setSlideIndex(1)
      setSlidePos(0)
    }
    startInterval()
  }

  const prevSlide = () => {
    calculateTranslatePos()
    clearIntervalFunc()
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
      setSlidePos(slidePos + translatePos)
    } else {
      setSlideIndex(dataSlider.length)
      setSlidePos(-dataSlider.length * translatePos + translatePos)
    }
    startInterval()
  }

  const moveDot = (index) => {
    clearIntervalFunc()
    setSlideIndex(index)
    startInterval()
  }

  const styles = {
    transform: `translateX(${slidePos}px)`,
  }

  return (
    <>
      <div className="container-slider">
        <SliderButton moveSlide={prevSlide} direction={"prev"} />
        <div className="container-images">
          {dataSlider.map((obj, index) => {
            return (
              <img
                src={obj.src}
                alt={obj.alt}
                key={obj.key}
                id={index}
                width={obj.width}
                style={styles}
              />
            )
          })}
        </div>
        <SliderButton moveSlide={nextSlide} direction={"next"} />
      </div>
      <div className="container-dots">
        {Array.from({ length: 4 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </>
  )
}
