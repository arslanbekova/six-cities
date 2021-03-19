import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../favorites-list/favorites-list';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types';
import {fetchFavoritesOffers} from "../../store/api-actions";
import Spinner from '../spinner/spinner';

const Favorites = (props) => {
  const {favoritesOffers, isFavoritesOffersLoaded, onOpenFavoritesPage} = props;

  useEffect(() => {
    if (!isFavoritesOffersLoaded) {
      onOpenFavoritesPage();
    }
  }, [isFavoritesOffersLoaded]);

  if (!isFavoritesOffersLoaded) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page">
      <Header/>
      {favoritesOffers.length === 0 ? <FavoritesEmpty/> : <FavoritesList/>}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favoritesOffers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  onOpenFavoritesPage: PropTypes.func.isRequired,
  isFavoritesOffersLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    favoritesOffers: state.favoritesOffers,
    isFavoritesOffersLoaded: state.isFavoritesOffersLoaded
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOpenFavoritesPage() {
    dispatch(fetchFavoritesOffers());
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
