export interface IUserData {
	name: string;
	email: string;
	password: string;
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	token: string;
}

// GOAL PART
export interface IGoal {
	_id: string;
	text: string;
	createdAt: string;
	updatedAt: string;
}
