import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import searchReducer from '../features/searchBar/searchSlice';
import chainReducer from '../components/chain/chainSlide';
import valReducer from '../components/validator/validatorSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    chain: chainReducer,
    val: valReducer
  },
});
