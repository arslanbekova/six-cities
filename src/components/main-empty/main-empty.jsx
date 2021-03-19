import React from 'react';
import PropTypes from 'prop-types';

const MainEmpty = (props) => {
  const {city} = props;
  return (
    <React.Fragment>
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
        </div>
      </section>
      <div className="cities__right-section" style={{backgroundImage: `url(../img/no-places@2x.png)`}}></div>
    </React.Fragment>
  );
};

MainEmpty.propTypes = {
  city: PropTypes.string.isRequired
};

export default MainEmpty;
