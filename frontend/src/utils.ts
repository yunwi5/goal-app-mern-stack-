export const getErrorMessage = (error: any) => {
	const message =
		(error && error.response && error.response.data && error.response.data.message) ||
		error.message ||
		error.toString();
	return message;
};
