import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const Register = () => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		pwConfirm: '',
	});

	const { name, email, password, pwConfirm } = formData;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

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
