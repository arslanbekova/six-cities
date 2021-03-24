import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SortOptions from '../sort-options/sort-options';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import {ComponentType, Filter} from '../../utils/const';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types';

const MainOffers = (props) => {
  const {offers, city, sortType} = props;
  const [activeOffer, setActiveOffer] = useState(0);

  const sortOffers = (sortBy, data) => {
    switch (sortBy) {
      case Filter.TO_HIGHEST_PRICE:
        data.sort((a, b) => a.price - b.price);
        break;
      case Filter.TO_LOWEST_PRICE:
        data.sort((a, b) => b.price - a.price);
        break;
      case Filter.TOP_RATED:
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
        <OffersList offers={offers} cardType={ComponentType.MAIN} setActiveOffer={setActiveOffer}/>
      </section>
      <div className="cities__right-section">
        <Map offers={offers} activeOffer={activeOffer} city={city} cityPoints={offers[0].city.location} mapType={ComponentType.MAIN}/>
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
