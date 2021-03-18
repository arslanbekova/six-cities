import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from '../review-item/review-item';
import {reviewTypes} from '../../prop-types/prop-types';

const ReviewsList = (props) => {
  const {reviews} = props;
  const MAX_REVIEWS_COUNT = 9;

  reviews.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <ul className="reviews__list">
      {reviews.map((review, i) =>
        i <= MAX_REVIEWS_COUNT ?
          <ReviewItem
            key={review.id}
            review={review}/>
          : ``
      )}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewTypes)).isRequired
};

export default ReviewsList;
