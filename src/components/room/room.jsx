import React, {useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import CommentForm from '../comment-form/comment-form';
import MapNear from '../map-near/map-near';
import OffersListNear from '../offers-list-near/offers-list-near';
import Spinner from '../spinner/spinner';
import {connect} from 'react-redux';
import {offerTypes, reviewTypes} from '../../prop-types/prop-types';
import {setRating} from '../../utils/general';
import {AuthorizationStatus} from '../../utils/const';
import {fetchOffer, fetchReviewsList, fetchOffersNear, addToFavorites} from "../../store/api-actions";
import {ActionCreator} from '../../store/action';

const Room = (props) => {
  const {reviews, offersNear, authorizationStatus, offer, onOpenOfferPage, isOfferLoaded, onAddToFavorites} = props;
  const history = useHistory();
  let {id} = useParams();

  useEffect(() => {
    if (!isOfferLoaded) {
      onOpenOfferPage(id);
    }
  }, [id, isOfferLoaded]);

  if (!isOfferLoaded) {
    return (
      <Spinner/>
    );
  }

  const separatedDescription = offer.description.split(`.`).slice(0, -1);
  const isPro = `
    .property__avatar-wrapper--pro::after {
      content: "";
      position: absolute;
      top: -3px;
      right: -16px;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      background-color: #ff9000;
      background-image: url(../img/star-white.svg);
      background-size: 20px 19px;
      background-position: center 6px;
      background-repeat: no-repeat
    }`;

  const handleFavoriteFlagChange = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      let status;
      if (offer.isFavorite) {
        status = 0;
      } else {
        status = 1;
      }
      onAddToFavorites(offer.id, status);
    } else {
      history.push(`/login`);
    }
  };

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((image) =>
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio"/>
                </div>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className={`property__bookmark-button button ${offer.isFavorite && `property__bookmark-button--active`}`} type="button" onClick={handleFavoriteFlagChange}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: setRating(offer)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  {offer.maxAdults}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good) =>
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper user__avatar-wrapper property__avatar-wrapper--pro" style={offer.host.isPro ? {isPro} : undefined}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  {separatedDescription.map((sentence) =>
                    <p className="property__text" key={sentence}>
                      {sentence + `.`}
                    </p>
                  )}
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                {authorizationStatus && <CommentForm offerId={offer.id}/>}
              </section>
            </div>
          </div>
          <MapNear offers={offersNear} activeOffer={offer} cityPoints={offer.city.location}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersListNear offers={offersNear}/>
          </section>
        </div>
      </main>
    </div>
  );
};

Room.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewTypes)).isRequired,
  offersNear: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  offer: PropTypes.oneOfType([PropTypes.shape(offerTypes), PropTypes.object.isRequired]),
  isOfferLoaded: PropTypes.bool.isRequired,
  onOpenOfferPage: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    offersNear: state.offersNear,
    reviews: state.reviews,
    authorizationStatus: state.authorizationStatus,
    offer: state.offer,
    isOfferLoaded: state.isOfferLoaded,
    city: state.city
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOpenOfferPage(offerId) {
    dispatch(fetchOffer(offerId))
    .then(() => dispatch(fetchReviewsList(offerId)))
    .then(() => dispatch(fetchOffersNear(offerId)))
    .catch(() => dispatch(ActionCreator.redirectToRoute(`/not_found`)));
  },
  onAddToFavorites(offerId, status) {
    dispatch(addToFavorites(offerId, status))
    .then(() => dispatch(fetchOffer(offerId)));
  },
});

export {Room};
export default connect(mapStateToProps, mapDispatchToProps)(Room);
