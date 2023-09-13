import { useState } from 'react';
import dataSlider from './dataSlider';
import SliderButton from './sliderButton';

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1)
  const [slidePos, setSlidePos] = useState(0)

  const nextSlide = () => {
      if(slideIndex !== dataSlider.length){
          setSlideIndex(slideIndex + 1)
          setSlidePos(slidePos - 400)
      } 
      else if (slideIndex === dataSlider.length){
          setSlideIndex(1)
          setSlidePos(0)
      }
  }
  const prevSlide = () => {
      if(slideIndex !== 1){
          setSlideIndex(slideIndex - 1)
          setSlidePos(slidePos + 400)
      }
      else if (slideIndex === 1){
          setSlideIndex(dataSlider.length)
          setSlidePos(-1200)
      }
  }
  const moveDot = index => {
    setSlideIndex(index)
  }
  const styles = { 
    transform: `translateX(${slidePos}px)` 
  }

  return (
    <>
    <div className="container-slider">
      <SliderButton moveSlide={prevSlide} direction={"prev"}/>
      <div className="container-images">
        {
          dataSlider.map((obj, index) => {
            return <img 
                      src={obj.src}
                      alt={obj.alt}
                      key={obj.key}
                      id={index}
                      width={obj.width}
                      style={styles}/>
          })
        }
      </div>
      <SliderButton moveSlide={nextSlide} direction={"next"}/>
    </div>
    <div className="container-dots">
      {Array.from({length: 4}).map((item, index) => (
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

