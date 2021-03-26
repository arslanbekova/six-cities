import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ComponentType} from '../../utils/const';
import {selectOffers} from '../../store/main-page-data/selectors';
import SortOptions from '../sort-options/sort-options';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

const MainOffers = () => {
  const {city} = useSelector((state) => state.MAIN_PAGE);
  const offers = useSelector(selectOffers);
  const [activeOffer, setActiveOffer] = useState(0);

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

export default MainOffers;
