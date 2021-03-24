import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../favorites-list/favorites-list';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types';

const Favorites = (props) => {
  const {favoritesOffers} = props;

  return (
    <div className="page">
      <Header/>
      {!Object.keys(favoritesOffers).length ? <FavoritesEmpty/> : <FavoritesList favoritesOffers={favoritesOffers}/>}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favoritesOffers: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape(offerTypes))).isRequired,
};

const mapStateToProps = (state) => {
  return {
    favoritesOffers: state.favoritesOffers.reduce((result, item) => {
      result[item.city.name] = [...result[item.city.name] || [], item];
      return result;
    }, {})
  };
};

export {Favorites};
export default connect(mapStateToProps)(Favorites);
