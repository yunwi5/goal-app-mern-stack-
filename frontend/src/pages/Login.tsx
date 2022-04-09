import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../store/store';
import { reset, login } from '../store/auth/auth-slice';
import Spinner from '../components/Spinner';

const Login = () => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;
	const { isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error('You need to enter your email and password');
		} else {
			dispatch(login({ email, password }));
		}
	};

	useEffect(
		() => {
			// console.log(`success: ${isSuccess}, message: ${message}`);
			if (isError) {
				toast.error(message);
			} else if (isSuccess) {
				toast.success(message || 'Login Successful!');
				navigate('/');
			}
			dispatch(reset());
		},
		[ navigate, dispatch, isError, isSuccess, message ],
	);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login and start setting goals</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Enter your email'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Enter your password'
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Submit
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Login;
