import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import QuestionDataForm from './QuestionDataForm';
import rootReducer from '../../store';

describe('test "QuestionDataForm" component', () => {
  test('should renders alert "Please add at least 2 answers for the question!" when the store is empty', () => {
    const store = configureStore({ reducer: rootReducer });
    //store is empty so the number of answers is 0
    render(
      <Provider store={store}>
        <QuestionDataForm />
      </Provider>
    );
    const linkElement = screen.getByText(
      /Please add at least 2 answers for the question!/i
    );
    expect(linkElement).toBeInTheDocument();
  });
});
