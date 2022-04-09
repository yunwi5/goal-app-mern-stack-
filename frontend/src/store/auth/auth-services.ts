import axios from 'axios';
import { IUserData, ILoginData } from '../../models/helper-models';

const API_URL = '/api/users';

// Register user
const register = async (userData: IUserData) => {
	const response = await axios.post(`${API_URL}/register`, userData);
	const data = response.data;

	if (data) {
		localStorage.setItem('user', JSON.stringify(data));
	}
	// return user data with token attached.
	return data;
};

const login = async (loginData: ILoginData) => {
	const response = await axios.post(`${API_URL}/login`, loginData);
	const { status, data } = response;
	if (status >= 0 && status < 300 && data) {
		localStorage.setItem('user', JSON.stringify(data));
	}

	return data;
};

const logout = async () => {
	localStorage.removeItem('user');
};

const authService = {
	register,
	logout,
	login,
};

export default authService;
