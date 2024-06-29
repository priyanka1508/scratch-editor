import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previousActions: previousActions,
  };

const reducerSlice = createSlice({
  name: 'yourSlice',
  initialState,
  reducers: {
    yourAction: (state) => {
      state.myStateProp = 'Action Dispatched!';
    },
  },
});

export const { yourAction } = yourSlice.actions;

export default yourSlice.reducer;
