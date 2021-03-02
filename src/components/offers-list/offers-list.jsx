import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

const OffersList = (props) => {

  const {offers, cardType} = props;

  const [, setPlaceCard] = useState(0);

  const OfferListSettings = {
    NEAR: {
      containerClass: `near-places__list`,
    },
    MAIN: {
      containerClass: `cities__places-list tabs__content`,
    }
  };

  return (
    <div className={`${OfferListSettings[cardType].containerClass} places__list`}>
      {
        offers.map((offer) =>
          <PlaceCard key={offer.id} offer={offer} setPlaceCard={setPlaceCard} cardType={cardType}/>
        )}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })),
  cardType: PropTypes.string.isRequired
};

export default OffersList;
