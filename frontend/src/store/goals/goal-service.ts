import axios from 'axios';

const API_URL = '/api/goals';

// JSON web token authorization header!
const getAuthorizationConfig = (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return config;
};

// create goal
const createGoal = async (text: string, token: string) => {
	const config = getAuthorizationConfig(token);
	const response = await axios.post(API_URL, { text }, config);
	return response.data;
};

const getGoals = async (token: string) => {
	const config = getAuthorizationConfig(token);
	const response = await axios.get(API_URL, config);
	return response.data;
};

const deleteGoal = async (goalId: string, token: string) => {
	const config = getAuthorizationConfig(token);
	const response = await axios.delete(`${API_URL}/${goalId}`, config);
	return response.data;
};

const goalService = { createGoal, getGoals, deleteGoal };

export default goalService;
