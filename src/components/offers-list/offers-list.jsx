import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {offerTypes} from '../../prop-types/prop-types';

const OffersList = (props) => {

  const {offers, cardType, setActiveCard} = props;
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
          <PlaceCard key={offer.id} offer={offer} cardType={cardType} setActiveCard={setActiveCard}/>
        )}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  cardType: PropTypes.string.isRequired,
  setActiveCard: PropTypes.func
};

export default OffersList;
