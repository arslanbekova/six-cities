import React, {useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
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
import {AuthorizationStatus, PathName, FavoriteStatus} from '../../utils/const';
import {fetchOffer, fetchReviewsList, fetchOffersNear, addToFavorites} from '../../store/actions/api-actions';
import {redirectToRoute} from '../../store/actions/redirect-actions';

const Room = () => {
  const {reviews, offersNear, offer, isOfferLoaded} = useSelector((state) => state.DATA);
  const {authorizationStatus} = useSelector((state) => state.USER);
  const dispatch = useDispatch();
  const history = useHistory();
  let {id} = useParams();

  useEffect(() => {
    if (!isOfferLoaded) {
      dispatch(fetchOffer(id))
      .then(() => dispatch(fetchReviewsList(id)))
      .then(() => dispatch(fetchOffersNear(id)))
      .catch(() => dispatch(redirectToRoute(PathName.NOT_FOUND)));
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
      dispatch(addToFavorites(offer.id, status))
      .then(() => dispatch(fetchOffer(offer.id)));
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
                <ReviewsList/>
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

export default Room;
