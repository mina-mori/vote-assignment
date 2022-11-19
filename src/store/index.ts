import { combineReducers } from '@reduxjs/toolkit';
import valuesSelector from './ValuesSlice';

const rootReducer = combineReducers({
  values: valuesSelector,
});

export default rootReducer;
