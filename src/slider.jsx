import { useState } from 'react';
import dataSlider from './dataSlider';
import SliderButton from './sliderButton';

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
      if(slideIndex !== dataSlider.length){
          setSlideIndex(slideIndex + 1)
      } 
      else if (slideIndex === dataSlider.length){
          setSlideIndex(1)
      }
  }
  const prevSlide = () => {
      if(slideIndex !== 1){
          setSlideIndex(slideIndex - 1)
      }
      else if (slideIndex === 1){
          setSlideIndex(dataSlider.length)
      }
  }

  return (
    <div className="container-slider">
      {
        dataSlider.map((obj, index) => {
          return <img src={obj.src} alt={obj.alt} key={obj.key} id={index} width={obj.width}/>
        })
      }
      <SliderButton moveSlide={prevSlide} direction={"prev"}/>
      <SliderButton moveSlide={nextSlide} direction={"next"}/>
    </div>
  )
}

