import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store';

test('renders App page title', () => {
  const store = configureStore({ reducer: rootReducer });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Sir vote-a-lot/i);
  expect(linkElement).toBeInTheDocument();
});
