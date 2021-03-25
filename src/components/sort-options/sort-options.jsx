import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SortOption} from '../../utils/const';
import {changeSortType} from '../../store/actions/main-page-actions';

const SortOptions = () => {
  const {sortType} = useSelector((state) => state.MAIN_PAGE);
  const SortListSettings = {
    CLOSED_CLASS: `places__options places__options--custom`,
    OPENED_CLASS: `places__options--opened places__options places__options--custom`
  };

  const [sortListClasses, changeSortListClasses] = useState(SortListSettings.CLOSED_CLASS);
  const dispatch = useDispatch();

  const handleSortListOpen = () => {
    return changeSortListClasses(SortListSettings.OPENED_CLASS);
  };

  const handleSortListClose = () => {
    return changeSortListClasses(SortListSettings.CLOSED_CLASS);
  };

  const handleChangeSortType = (sortItem) => {
    dispatch(changeSortType(sortItem));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={handleSortListOpen}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortListClasses}>
        {Object.values(SortOption).map((sortItem) =>
          <li key={sortItem} className={`${sortType === sortItem && `places__option--active`} places__option`} tabIndex="0"
            onClick={() => {
              handleChangeSortType(sortItem);
              handleSortListClose();
            }}>{sortItem}</li>
        )}
      </ul>
    </form>
  );
};

export default SortOptions;
