import React from 'react';
import PropTypes from 'prop-types';

const RoomInside = ({goods}) => {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {goods.map((good) =>
          <li className="property__inside-item" key={good}>
            {good}
          </li>
        )}
      </ul>
    </div>
  );
};

RoomInside.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoomInside;
