import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import authReducer from './auth/auth-slice';
import goalReducer from './goals/goal-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		goals: goalReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

// TypeScript typed redux settings
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
