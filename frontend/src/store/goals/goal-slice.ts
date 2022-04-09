import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IGoal } from '../../models/helper-models';
import { getErrorMessage } from '../../utils';

import goalService from './goal-service';

interface IGoalState {
	goals: IGoal[];
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	message: string;
}

const initialState: IGoalState = {
	goals: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

export const createGoal = createAsyncThunk('goals/goals', async (goalText: string, thunkAPI) => {
	try {
		const token = (thunkAPI.getState() as any).auth.user.token;
		const result = await goalService.createGoal(goalText, token);
		return result;
	} catch (err) {
		const message = getErrorMessage(err);
		return thunkAPI.rejectWithValue(message);
	}
});

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
	try {
		const token = (thunkAPI.getState() as any).auth.user.token;
		return await goalService.getGoals((token as string) || '');
	} catch (err) {
		const message = getErrorMessage(err);
		return thunkAPI.rejectWithValue(message);
	}
});

export const deleteGoal = createAsyncThunk('goals/delete', async (goalId: string, thunkAPI) => {
	try {
		const token = (thunkAPI.getState() as any).auth.user.token;
		const deleteData = await goalService.deleteGoal(goalId, (token as string) || '');
		return deleteData.id.toString();
	} catch (err) {
		const message = getErrorMessage(err);
		return thunkAPI.rejectWithValue(message);
	}
});

const goalSlice = createSlice({
	name: 'goals',
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals.push(action.payload);
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// payload should be the list of IGoals!
				state.goals = action.payload;
				state.message = 'Get your goals successful!';
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// payload should be the list of IGoals!
				state.goals = state.goals.filter((goal) => {
					return goal._id !== action.payload.toString();
				});
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			});
	},
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
