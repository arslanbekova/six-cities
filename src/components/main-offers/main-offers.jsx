import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {offerTypes} from '../../prop-types/prop-types';
import SortOptions from '../sort-options/sort-options';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

const MainOffers = (props) => {
  const {offers, city, sortType} = props;
  const [activeCard, setActiveCard] = useState(0);

  const sortOffers = (sortBy, data) => {
    switch (sortBy) {
      case `Price: low to high`:
        data.sort((a, b) => a.price - b.price);
        break;
      case `Price: high to low`:
        data.sort((a, b) => b.price - a.price);
        break;
      case `Top rated first`:
        data.sort((a, b) => b.rating - a.rating);
        break;
      default:
        return data;
    }
    return data;
  };

  sortOffers(sortType, offers);

  return (
    <React.Fragment>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {city}</b>
        <SortOptions/>
        <OffersList offers={offers} cardType="MAIN" setActiveCard={setActiveCard}/>
      </section>
      <div className="cities__right-section">
        <Map offers={offers} activeCard={activeCard} city={city} mapType="MAIN"/>
      </div>
    </React.Fragment>
  );
};

MainOffers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  city: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sortType: state.sortType
  };
};

export {MainOffers};
export default connect(mapStateToProps)(MainOffers);
