import React, {useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import Header from '../header/header';
import RoomRating from '../room-rating/room-rating';
import RoomFeatures from '../room-features/room-features';
import RoomPrice from '../room-price/room-price';
import RoomInside from '../room-inside/room-inside';
import RoomHost from '../room-host/room-host';
import ReviewsList from '../reviews-list/reviews-list';
import CommentForm from '../comment-form/comment-form';
import MapNear from '../map-near/map-near';
import OffersListNear from '../offers-list-near/offers-list-near';
import Spinner from '../spinner/spinner';
import {connect} from 'react-redux';
import {offerTypes, reviewTypes} from '../../prop-types/prop-types';
import {AuthorizationStatus, PathName, FavoriteStatus} from '../../utils/const';
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

  const handleFavoriteFlagChange = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      let status;
      if (offer.isFavorite) {
        status = FavoriteStatus.REMOVE;
      } else {
        status = FavoriteStatus.ADD;
      }
      onAddToFavorites(offer.id, status);
    } else {
      history.push(PathName.LOGIN);
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
              <RoomRating rating={offer.rating}/>
              <RoomFeatures offerType={offer.type} bedroomsCount={offer.bedrooms} maxAdults={offer.maxAdults}/>
              <RoomPrice price={offer.price}/>
              <RoomInside goods={offer.goods}/>
              <RoomHost hostInfo={offer.host} offerDescription={offer.description}/>
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
    .catch(() => dispatch(ActionCreator.redirectToRoute(PathName.NOT_FOUND)));
  },
  onAddToFavorites(offerId, status) {
    dispatch(addToFavorites(offerId, status))
    .then(() => dispatch(fetchOffer(offerId)));
  },
});

export {Room};
export default connect(mapStateToProps, mapDispatchToProps)(Room);
