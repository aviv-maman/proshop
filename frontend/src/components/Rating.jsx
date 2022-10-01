import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  const count = 5;
  const stars = [];

  for (let index = 0; index < count; index++) {
    stars.push(
      <span key={index}>
        <i
          style={{ color }}
          className={
            value >= 1 + index
              ? 'fa-solid fa-star'
              : value >= 0.5 + index
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }></i>
      </span>
    );
  }

  return (
    <div className='rating'>
      {stars}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = { value: 0, color: '#f8e825' };

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
