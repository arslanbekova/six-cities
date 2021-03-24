import React from 'react';
import PropTypes from 'prop-types';
import {toUpperCaseFirstSymbol, returnCorrectWordForm} from '../../utils/general';

const RoomFeatures = (props) => {
  const {offerType, bedroomsCount, maxAdults} = props;
  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {toUpperCaseFirstSymbol(offerType)}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {`${bedroomsCount} Bedroom${returnCorrectWordForm(bedroomsCount)}`}
      </li>
      <li className="property__feature property__feature--adults">
        {`Max ${maxAdults} adult${returnCorrectWordForm(maxAdults)}`}
      </li>
    </ul>
  );
};

RoomFeatures.propTypes = {
  offerType: PropTypes.string.isRequired,
  bedroomsCount: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired
};

export default RoomFeatures;
