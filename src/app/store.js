import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../functions/counter/counterSlice';
import searchReducer from '../components/searchBar/searchSlice';
import chainReducer from '../pages/chain/chainSlide';
import bondedTokenReducer from '../pages/chain/bondedTokenSlice';
import valReducer from '../pages/validator/validatorSlide'
import dataReducer from '../data/dataSlice';
import blogReducer from '../pages/blogEntry/blogSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    chain: chainReducer,
    val: valReducer,
    data: dataReducer,
    bondedToken: bondedTokenReducer,
    blog: blogReducer
  },
});
