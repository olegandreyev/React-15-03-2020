import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from './404';

test('renders learn react link', () => {
  const wrapper = render(<NotFoundPage />);
  const linkElement = wrapper.getByText(/404 page not Found/i);
  expect(linkElement).toBeInTheDocument();
});
