import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {OfferListSettings} from '../../utils/consts';

const OffersList = (props) => {
  const {offers, cardType} = props;
  const [, setPlaceCard] = useState(0);

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
