import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/store';
import { toast } from 'react-toastify';

import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { reset, getGoals } from '../store/goals/goal-slice';
import { IGoal } from '../models/helper-models';

const Dashboard: React.FC = (props) => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.auth);

	const { goals, isLoading, isError, isSuccess, message } = useAppSelector(
		(state) => state.goals,
	);
	const dispatch = useAppDispatch();

	useEffect(
		() => {
			if (isError) {
				toast.error(message);
			}
			if (!user) {
				navigate('/login');
			}
			dispatch(getGoals());
			return () => {
				dispatch(reset());
			};
		},
		[ user, navigate, isError, isSuccess, message, dispatch ],
	);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Fragment>
			<section className='heading'>
				<h1>Welcome {user && user.name}!</h1>
				<p>Goals Dashboard</p>
			</section>
			<GoalForm />
			<section className='content'>
				{goals.length > 0 ? (
					goals.map((goal: IGoal) => <GoalItem key={goal._id} goal={goal} />)
				) : (
					<h3>You have not set any goals</h3>
				)}
			</section>
		</Fragment>
	);
};

export default Dashboard;
