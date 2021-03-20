import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {setRating} from '../../utils/general';
import {AuthorizationStatus} from '../../utils/const';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types';
import {addToFavorites} from "../../store/api-actions";

const PlaceCard = (props) => {

  const {offer, cardType, setActiveCard, authorizationStatus, onAddToFavorites} = props;
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

  const handleChangeFavoriteFlag = (activeOffer) => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      let status;
      if (activeOffer.isFavorite) {
        status = 0;
      } else {
        status = 1;
      }
      onAddToFavorites(activeOffer.id, status);
    } else {
      history.push(`/login`);
    }
  };

  const handleOpenOfferPage = () => {
    history.push(`/offer/${offer.id}`);
  };

  const handleSetActiveCard = (offerId) => {
    if (cardType === `MAIN`) {
      setActiveCard(offerId);
    }
  };

  return (
    <article className={`${CardSettings[cardType].cardClass} place-card`} onMouseEnter={() => handleSetActiveCard(offer.id)} onMouseOut={() => handleSetActiveCard(0)}>
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
          <button className={`place-card__bookmark-button button ${offer.isFavorite && `place-card__bookmark-button--active`}`} type="button" onClick={() => handleChangeFavoriteFlag(offer)}>
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
        <h2 className="place-card__name" onClick={handleOpenOfferPage}>
          {offer.title}
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape(offerTypes),
  setActiveCard: PropTypes.func,
  cardType: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  onAddToFavorites: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  onAddToFavorites(offerId, status) {
    dispatch(addToFavorites(offerId, status));
  },
});

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
