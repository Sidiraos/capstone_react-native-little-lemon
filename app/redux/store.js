import { configureStore } from '@reduxjs/toolkit';
import profilInfoSlice from './slices/profilInfoSlice';

export const store = configureStore({
  reducer: {
    profilInfo: profilInfoSlice
  },
})