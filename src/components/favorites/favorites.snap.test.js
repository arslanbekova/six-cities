import React from  'react';
import { render } from '@testing-library/react';
import * as redux from 'react-redux'
import Favorites from './favorites';

test(`Should Favorites render correctly`, () => {
  jest
  .spyOn(redux, 'useSelector')
  .mockReturnValue({favoritesOffers: []});
  const { container } = render(
    <Favorites/>
  );
  expect(container).toMatchSnapshot();
})
