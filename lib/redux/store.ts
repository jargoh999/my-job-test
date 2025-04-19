import { configureStore } from '@reduxjs/toolkit';
import podcastReducer from './slices/podcastSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        podcasts: podcastReducer,
        categories: categoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;