/* eslint-disable no-underscore-dangle */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './slices/userSlice';
import themesReducer from './slices/themesSlice';

export const initialStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
      themes: themesReducer,
    },
    preloadedState,
    middleware: [thunk],
  });
};

export type TRootState = ReturnType<
  ReturnType<typeof initialStore>['getState']
>;

export type TAppDispatch = ReturnType<typeof initialStore>['dispatch'];
