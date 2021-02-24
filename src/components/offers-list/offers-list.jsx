import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import PlaceCardNear from '../place-card-near/place-card-near';

const OffersList = (props) => {
  const {offers, className} = props;
  const [, setPlaceCard] = useState(0);

  const getComponentByClassName = (componentClassName, offer) => {
    switch (componentClassName) {
      case `near-places__list`:
        return <PlaceCardNear
          key={offer.id}
          offer={offer}
          setPlaceCard={setPlaceCard}
          className="near-places__card"
          imageClassName="near-places__image-wrapper"/>;
    }

    return <PlaceCard
      key={offer.id}
      offer={offer}
      setPlaceCard={setPlaceCard}
      className="cities__place-card"/>;
  };

  return (
    <div className={`${className || `cities__places-list tabs__content`} places__list`}>
      {
        offers.map((offer) =>
          getComponentByClassName(className, offer))
      }
    </div>
  );
};

OffersList.propTypes = {
  className: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }))
};

export default OffersList;
