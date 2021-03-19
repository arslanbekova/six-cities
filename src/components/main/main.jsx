import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import Spinner from '../spinner/spinner';
import MainEmpty from '../main-empty/main-empty';
import MainOffers from '../main-offers/main-offers';
import {connect} from 'react-redux';
import {fetchOffersList} from "../../store/api-actions";
import {offerTypes} from '../../prop-types/prop-types';

const Main = (props) => {
  const {offers, city, isDataLoaded, onLoadData} = props;

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
            {offers.length === 0 ? <MainEmpty city={city}/> : <MainOffers city={city} offers={offers}/>}
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  city: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    city: state.city,
    offers: state.offers.filter((offer) => offer.city.name === state.city),
    isDataLoaded: state.isDataLoaded
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffersList());
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

