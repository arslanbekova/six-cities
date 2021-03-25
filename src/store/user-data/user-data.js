import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, loadAuthInfo} from '../actions/user-actions';
import {AuthorizationStatus} from '../../utils/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
};

const userData = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });
  builder.addCase(loadAuthInfo, (state, action) => {
    state.authInfo = action.payload;
  });
});

export {userData};
