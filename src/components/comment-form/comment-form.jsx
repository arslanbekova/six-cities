import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postComment} from "../../store/api-actions";

const CommentForm = (props) => {
  const {offerId, onSubmit} = props;

  const InputRatingValues = {
    FIVE_STARS: `5`,
    FOUR_STARS: `4`,
    THREE_STARS: `3`,
    TWO_STARS: `2`,
    ONE_STAR: `1`
  };

  const FormValidationPoints = {
    MIN_REVIEW_LENGTH: 50,
    MAX_REVIEW_LENGTH: 300,
    MIN_RATING_VALUE: 1
  };

  const [userForm, setUserForm] = useState({
    rating: ``,
    review: ``,
    isDisableFormField: false,
    isChecked: false
  });

  const [isDisableButton, setDisableButton] = useState(true);

  const onSuccessUpLoad = () => {
    setUserForm({
      rating: ``,
      review: ``,
      isDisableFormField: false,
      isChecked: false
    });
  };

  const onErrorUpLoad = () => {
    setUserForm({...userForm, isDisableFormField: false});
    setDisableButton(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setDisableButton(true);
    setUserForm({...userForm, isDisableFormField: true});

    onSubmit(offerId, {
      comment: userForm.review,
      rating: userForm.rating
    }, onSuccessUpLoad, onErrorUpLoad);
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setUserForm({...userForm, [name]: value, isChecked: true});

    if (userForm.review.length >= FormValidationPoints.MIN_REVIEW_LENGTH
      && userForm.review.length <= FormValidationPoints.MAX_REVIEW_LENGTH
        && userForm.rating >= FormValidationPoints.MIN_RATING_VALUE) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={userForm.rating === InputRatingValues.FIVE_STARS} disabled={userForm.isDisableFormField} onChange={handleFieldChange}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={userForm.rating === InputRatingValues.FOUR_STARS} disabled={userForm.isDisableFormField} onChange={handleFieldChange}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={userForm.rating === InputRatingValues.THREE_STARS} disabled={userForm.isDisableFormField} onChange={handleFieldChange}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={userForm.rating === InputRatingValues.TWO_STARS} disabled={userForm.isDisableFormField} onChange={handleFieldChange}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" checked={userForm.rating === InputRatingValues.ONE_STAR} disabled={userForm.isDisableFormField} onChange={handleFieldChange}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value={userForm.review}
        disabled={userForm.isDisableFormField}
        onChange={handleFieldChange}
        minLength={FormValidationPoints.MIN_REVIEW_LENGTH}
        maxLength={FormValidationPoints.MAX_REVIEW_LENGTH}
        required>
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisableButton}>Submit</button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(offerId, commentData, onSuccessUpLoad, onErrorUpLoad) {
    dispatch(postComment(offerId, commentData, onSuccessUpLoad, onErrorUpLoad));
  },
});

export {CommentForm};
export default connect(null, mapDispatchToProps)(CommentForm);
