import React from 'react';
import {useSelector} from 'react-redux';
import {selectReviews} from '../../store/offers-data/selectors';
import ReviewItem from '../review-item/review-item';

const ReviewsList = () => {
  const reviews = useSelector(selectReviews);
  const MAX_REVIEWS_COUNT = 9;

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

export default ReviewsList;
