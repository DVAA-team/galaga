/* eslint-disable no-underscore-dangle */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './slices/userSlice';

export const initialStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
    middleware: [thunk],
  });
};

export type TRootState = ReturnType<
  ReturnType<typeof initialStore>['getState']
>;

export type TAppDispatch = ReturnType<typeof initialStore>['dispatch'];
