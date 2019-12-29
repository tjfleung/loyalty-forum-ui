import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders form elements', () => {
  const { getByText } = render(<App />);
  const userNameLabel = getByText(/Username:/i);
  const locationLabel = getByText(/Location:/i);
  const messageLabel = getByText(/Message:/i);
  const buttonDoneLabel = getByText(/Done/i);
  expect(userNameLabel).toBeInTheDocument();
  expect(locationLabel).toBeInTheDocument();
  expect(messageLabel).toBeInTheDocument();
  expect(buttonDoneLabel).toBeInTheDocument();
});
