import {combineReducers} from 'redux';
import {mainPageData} from './main-page-data/main-page-data';
import {offersData} from './offers-data/offers-data';
import {userData} from './user-data/user-data';

export const NameSpace = {
  DATA: `DATA`,
  MAIN_PAGE: `MAIN_PAGE`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: offersData,
  [NameSpace.MAIN_PAGE]: mainPageData,
  [NameSpace.USER]: userData,
});
