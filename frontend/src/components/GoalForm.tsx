import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { createGoal } from '../store/goals/goal-slice';

const GoalForm: React.FC = (props) => {
	const [ text, setText ] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(createGoal(text));
		setText('');
	};

	return (
		<section className='form'>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='text'>Goal</label>
					<input
						type='text'
						name='text'
						id='text'
						value={text}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setText(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<button className='btn btn-block' type='submit'>
						Add Goal
					</button>
				</div>
			</form>
		</section>
	);
};

export default GoalForm;
