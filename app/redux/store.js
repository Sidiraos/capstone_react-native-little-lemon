import { configureStore } from '@reduxjs/toolkit';
import profilInfoSlice from './slices/profilInfoSlice';
import foodMenuSlice from './slices/foodMenuSlice';

export const store = configureStore({
  reducer: {
    profilInfo: profilInfoSlice,
    menu : foodMenuSlice
  },
})