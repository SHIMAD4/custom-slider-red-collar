import PropTypes from 'prop-types';
import leftArrow from './img/leftArrow.svg';
import rightArrow from './img/rightArrow.svg';

export default function SliderButton({ direction, moveSlide }) {
    return (
      <button
        onClick={moveSlide}
        className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
      >
        <img src={direction === "next" ? rightArrow : leftArrow} width={150}/>
      </button>
    )
}

SliderButton.propTypes = {
    direction: PropTypes.string,
    moveSlide: PropTypes.func,
}