import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

const OffersList = (props) => {
  const {offers} = props;
  const [, setPlaceCard] = useState(0);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <PlaceCard
          key={offer.id}
          offer={offer}
          setPlaceCard={setPlaceCard}/>
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
  }))
};

export default OffersList;
