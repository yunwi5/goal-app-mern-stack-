import React, { Fragment } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { logout, reset } from '../store/auth/auth-slice';

const Header: React.FC = (props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	console.log('user:', user);

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>GoalSetter</Link>
			</div>
			<ul>
				{!user && (
					<Fragment>
						<li>
							<Link to='/login'>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser /> Register
							</Link>
						</li>
					</Fragment>
				)}
				{user && (
					<li>
						<button className='btn' onClick={handleLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				)}
			</ul>
		</header>
	);
};

export default Header;
