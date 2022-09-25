/* eslint-disable no-underscore-dangle */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './slices/userSlice';
import themesReducer from './slices/themesSlice';
import forumReducer from './slices/forumSlice';
import csfrReducer from './slices/csfrSlice';

export const initialStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
      themes: themesReducer,
      forum: forumReducer,
      csfr: csfrReducer,
    },
    preloadedState,
    middleware: [thunk],
  });
};

export const initialState = initialStore();

export type TRootState = ReturnType<
  ReturnType<typeof initialStore>['getState']
>;

export type TAppDispatch = ReturnType<typeof initialStore>['dispatch'];
