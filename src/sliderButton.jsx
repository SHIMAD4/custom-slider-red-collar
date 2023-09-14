import PropTypes from 'prop-types';
import leftArrow from './img/leftArrow.svg';
import rightArrow from './img/rightArrow.svg';

export function SliderButton({ direction, moveSlide }) {
    return (
      <button
        onClick={moveSlide}
        className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
      >
        <img 
            className={direction === "next" ? "next-button" : "prev-button"}
            src={direction === "next" ? rightArrow : leftArrow}
            width={48}
            height={48}/>
      </button>
    )
}

SliderButton.propTypes = {
    direction: PropTypes.string,
    moveSlide: PropTypes.func,
}