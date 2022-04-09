import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { FaUser } from 'react-icons/fa';
import { useAppSelector } from '../store/store';
import { register, reset } from '../store/auth/auth-slice';
import Spinner from '../components/Spinner';

const Register = () => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		pwConfirm: '',
	});

	const { name, email, password, pwConfirm } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !email || !password || !pwConfirm) {
			toast.error('Please type name, email, password and confirm!');
		} else if (password !== pwConfirm) {
			toast.error('Password do not match!');
		} else {
			const userData = { name, email, password };
			dispatch(register(userData));
		}
	};

	useEffect(
		() => {
			if (isError) {
				toast.error(message);
			}
			if (isSuccess || user) {
				toast.success('Register successful!');
				navigate('/');
			}
			dispatch(reset());
		},
		[ user, isError, isSuccess, message, navigate, dispatch ],
	);

	if (isLoading) {
		return <Spinner />;
	}

	// console.log(isError);

	return (
		<div>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='Enter your name'
							onChange={handleChange}
						/>
					</div>
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
						<input
							type='password'
							className='form-control'
							id='pwConfirm'
							name='pwConfirm'
							value={pwConfirm}
							placeholder='Confirm your password'
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

export default Register;
