import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/root';

export const store = configureStore({
    reducer: rootReducer,
});
