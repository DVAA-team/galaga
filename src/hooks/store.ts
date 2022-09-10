/* eslint-disable @typescript-eslint/no-restricted-imports */
import { TAppDispatch, TRootState } from '@/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
