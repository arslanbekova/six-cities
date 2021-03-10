import React from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {setRating} from '../../utils/general';
import {AuthorizationStatus} from '../../utils/const';

const PlaceCard = (props) => {

  const {offer, cardType, setActiveCard, authorizationStatus} = props;
  const history = useHistory();

  const CardSettings = {
    NEAR: {
      containerClass: `near-places__list`,
      cardClass: `near-places__card`,
      imageClass: `near-places__image-wrapper`,
    },
    MAIN: {
      containerClass: `cities__places-list tabs__content`,
      cardClass: `cities__place-card`,
      imageClass: `cities__image-wrapper`,
    }
  };

  const isFavorite = () => {
    let buttonFavoriteClasses = [`place-card__bookmark-button`, `button`];
    if (offer.isFavorite) {
      buttonFavoriteClasses.push(`place-card__bookmark-button--active`);
    }
    return buttonFavoriteClasses.join(` `);
  };

  const changeFavoriteFlag = () => {
  if (authorizationStatus === AuthorizationStatus.AUTH) {

  }

  history.push(`/login`);
  };

  const handleChangeFavoriteFlag = () => {
    changeFavoriteFlag();
  };

  return (
    <article className={`${CardSettings[cardType].cardClass} place-card`} onMouseOver={() => setActiveCard(offer.id)} onMouseOut={() => setActiveCard(0)}>
      {offer.isPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${CardSettings[cardType].imageClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavorite()} type="button" onClick={handleChangeFavoriteFlag}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: setRating(offer)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="/offer/id">{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }),
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  }),
  setActiveCard: PropTypes.func.isRequired,
  cardType: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.bool.isRequired
};

export default PlaceCard;
