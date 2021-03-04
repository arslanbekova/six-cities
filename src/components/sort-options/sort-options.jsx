import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const SortOptions = (props) => {
  const {handleSortOffers, activeSortType} = props;

  const SortListSettings = {
    CLOSED_CLASS: `places__options places__options--custom`,
    OPENED_CLASS: `places__options--opened places__options places__options--custom`
  };
  const SortTypes = {
    POPULAR: `Popular`,
    PRICE_HIGHEST: `Price: low to high`,
    PRICE_LOWER: `Price: high to low`,
    RATE: `Top rated first`
  };
  const [sortListClasses, changeOpenedClass] = useState(SortListSettings.CLOSED_CLASS);

  const handleSortListOpen = () => {
    return (sortListClasses.includes(SortListSettings.OPENED_CLASS) ?
      changeOpenedClass(SortListSettings.CLOSED_CLASS) :
      changeOpenedClass(SortListSettings.OPENED_CLASS));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={handleSortListOpen}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortListClasses}>
        {Object.values(SortTypes).map((sortType) =>
          <li key={sortType} className={`${activeSortType === sortType && `places__option--active`} places__option`} tabIndex="0" onClick={() => handleSortOffers(sortType)}>{sortType}</li>)}
      </ul>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    activeSortType: state.sortType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleSortOffers(sortType) {
    dispatch(ActionCreator.sortOffers(sortType));
  }
});

SortOptions.propTypes = {
  handleSortOffers: PropTypes.func.isRequired,
  activeSortType: PropTypes.string.isRequired
};

export {SortOptions};
export default connect(mapStateToProps, mapDispatchToProps)(SortOptions);
