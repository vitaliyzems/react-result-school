import { useEffect, useState } from 'react';
import { AppLayout } from './AppLayout';
import { store } from '../../store';

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export const App = () => {
	const [updateBoard, setUpdateBoard] = useState(false);

	useEffect(() => {
		return store.subscribe(() => setUpdateBoard(!updateBoard));
	}, [updateBoard]);

	const { field, isGameEnded, isDraw } = store.getState();

	const checkVictory = () => {
		for (let pattern of WIN_PATTERNS) {
			if (
				pattern.every((idx) => field[idx] === 'X') ||
				pattern.every((idx) => field[idx] === 'O')
			) {
				return true;
			}
		}
		return false;
	};

	if (!isGameEnded && (checkVictory() || !field.some((cell) => cell === ''))) {
		store.dispatch({ type: 'setIsGameEnded', payload: true });
	}

	if (!isDraw && isGameEnded && !checkVictory()) {
		store.dispatch({ type: 'setIsDraw', payload: true });
	}

	return <AppLayout />;
};
