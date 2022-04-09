import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginData, IUser, IUserData } from '../../models/helper-models';
import { getErrorMessage } from '../../utils';

import authService from './auth-services';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user') || '{}');
const isLoggedIn = Object.keys(user).length > 0;

interface IAuthState {
	user: IUser | null;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
}

const initialState: IAuthState = {
	user: isLoggedIn ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user: IUserData, thunkAPI) => {
	try {
		const result = await authService.register(user);
		return result;
	} catch (err) {
		const message = getErrorMessage(err as any);
		return thunkAPI.rejectWithValue(message);
	}
});

export const login = createAsyncThunk('auth/login', async (loginData: ILoginData, thunkAPI) => {
	try {
		const result = await authService.login(loginData);
		return result;
	} catch (err) {
		const message = getErrorMessage(err as any);
		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		// Extra status handling
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = (action.payload as string) || 'Register went wrong!';
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
