import React from  'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux'
import Header from './header';
import { AuthorizationStatus, AuthInfo } from '../../test-data/test-data';

describe(`Should Header render correctly`, () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const history = createMemoryHistory();

  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
  });

  test(`if user is authorized`, () => {
    useSelectorMock.mockReturnValue({
      authorizationStatus: AuthorizationStatus.AUTH,
      authInfo: AuthInfo.AUTHORIZED_USER
    });

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);
    expect(dummyDispatch).not.toHaveBeenCalled();

    const { container } = render(
      <Router history={history}>
        <Header/>
      </Router>
    );
    expect(container).toMatchSnapshot();
  })
  test(`if user is unauthorized`, () => {
    useSelectorMock.mockReturnValue({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: AuthInfo.UNAUTHORIZED_USER
    });

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);
    expect(dummyDispatch).not.toHaveBeenCalled();

    const { container } = render(
      <Router history={history}>
        <Header/>
      </Router>
    );
    expect(container).toMatchSnapshot();
  })
})
