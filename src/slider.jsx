import { useEffect, useRef, useState } from 'react';
import SliderButton from './SliderButton';
import dataSlider from './dataSlider';

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1)
  const [slidePos, setSlidePos] = useState(0)
  const intervalRef = useRef(null)
  let translatePos = 400

  useEffect(() => {
    startInterval()
    window.addEventListener('resize', calculateTranslatePos)
    return () => {
      clearIntervalFunc()
      window.removeEventListener('resize', calculateTranslatePos)
    }
  })

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
    setSlidePos(-translatePos * (index - 1))
    setSlideIndex(index)
    startInterval()
  }  

  const styles = {
    transform: `translateX(${slidePos}px)`,
    transition: 'all .3s ease-in-out'
  }

  return (
    <>
      <div className="container-slider">
        <SliderButton moveSlide={prevSlide} direction={"prev"} />
        <ul className="container-images">
          {dataSlider.map((obj, index) => {
            return (
              <li key={obj.key}>
                <img src={obj.src} alt={obj.alt} id={index} width={obj.width} style={styles}/>
                <p style={styles}>{obj.title}</p>
              </li>
            )
          })}
        </ul>
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
