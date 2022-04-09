import React from 'react';
import { useAppDispatch } from '../store/store';

import { IGoal } from '../models/helper-models';
import { deleteGoal } from '../store/goals/goal-slice';

const GoalItem: React.FC<{ goal: IGoal }> = ({ goal }) => {
	const dispatch = useAppDispatch();

	return (
		<div className='goal'>
			{new Date(goal.createdAt).toLocaleString('en-US')}
			<h2>{goal.text}</h2>
			<button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
				X
			</button>
		</div>
	);
};

export default GoalItem;
