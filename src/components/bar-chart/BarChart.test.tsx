import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../../store';
import BarChart from './BarChart';

export const setupStore = (preloadedState?: PreloadedState<any>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const store = setupStore(); //configureStore({ reducer: rootReducer });
describe('test Bar Chart', () => {
  test('should render "No data found if there is no at least 2 options"', () => {
    //store is empty
    render(
      <Provider store={store}>
        <BarChart />
      </Provider>
    );
    const linkElement = screen.getByText(/No data found/i);
    expect(linkElement).toBeInTheDocument();
  });
});
