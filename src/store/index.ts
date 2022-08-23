/* eslint-disable no-underscore-dangle */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './slices/userSlice';

let initialState = {};

if (typeof window !== 'undefined') {
  initialState = window.__PRELOADED_STATE__ ?? {};
  delete window.__PRELOADED_STATE__;
}

export const initialStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
    middleware: [thunk],
  });
};

export const store = initialStore(initialState);

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
