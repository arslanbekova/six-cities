import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list';
import Header from '../header/header';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortOptions from '../sort-options/sort-options';
import Spinner from '../spinner/spinner';
import {connect} from 'react-redux';
import {fetchOffersList} from "../../store/api-actions";

const Main = (props) => {
  const {offers, city, isDataLoaded, onLoadData, authorizationStatus} = props;

  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <SortOptions/>
              <OffersList offers={offers} cardType="MAIN" setActiveCard={setActiveCard} authorizationStatus={authorizationStatus}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} activeCard={activeCard} city={city}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
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
  city: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.bool.isRequired
};

const sortOffers = (sortType, offers) => {
  switch (sortType) {
    case `Price: low to high`:
      offers.sort((a, b) => a.price - b.price);
      break;
    case `Price: high to low`:
      offers.sort((a, b) => b.price - a.price);
      break;
    case `Top rated first`:
      offers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      return offers;
  }
  return offers;
};

const mapStateToProps = (state) => {
  return {
    city: state.city,
    offers: sortOffers(state.sortType, state.offers.filter((offer) => offer.city.name === state.city)),
    sortType: state.sortType,
    isDataLoaded: state.isDataLoaded,
    authorizationStatus: state.authorizationStatus
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffersList());
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

