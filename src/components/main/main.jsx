import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import Spinner from '../spinner/spinner';
import MainEmpty from '../main-empty/main-empty';
import MainOffers from '../main-offers/main-offers';
import {fetchOffersList} from "../../store/actions/api-actions";

const Main = () => {
  const {isDataLoaded, offers} = useSelector((state) => state.MAIN_PAGE);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchOffersList());
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
            {!offers.length ? <MainEmpty/> : <MainOffers/>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;

