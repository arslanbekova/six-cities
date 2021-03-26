import React from 'react';
import PropTypes from 'prop-types';
import {setRating} from '../../utils/general';

const RoomRating = ({rating}) => {
  return (
    <div className="property__rating rating">
      <div className="property__stars rating__stars">
        <span style={{width: setRating(rating)}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="property__rating-value rating__value">{rating}</span>
    </div>
  );
};

RoomRating.propTypes = {
  rating: PropTypes.number.isRequired
};

export default RoomRating;
