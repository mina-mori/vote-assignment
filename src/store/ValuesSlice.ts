import { createSlice } from '@reduxjs/toolkit';
import { OptionModel } from '../models/OptionModel';

const initialState = {
  question: '' as string,
  options: [] as OptionModel[],
};

const ValuesSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    addtOptions: (state, action) => {
      state.options.push(action.payload);
    },
    editOption: (state, action) => {
      let option = state.options.find(
        (o: OptionModel) => o.id == action.payload.id
      );
      if (option) option.text = action.payload.text;
    },
    deleteOption: (state, action) => {
      state.options = state.options.filter((o) => o.id != action.payload);
    },
    increaseVote: (state, action) => {
      let val = state.options.find((o: OptionModel) => o.id == action.payload);
      val && val.voteCount++;
    },
    resetOptions: (state) => {
      state.options = [];
    },
  },
});

export const {
  setQuestion,
  addtOptions,
  resetOptions,
  editOption,
  deleteOption,
  increaseVote,
} = ValuesSlice.actions;
export const valuesSelector = (state: any) => state.values;
export default ValuesSlice.reducer;
