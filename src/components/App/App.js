import { useState } from 'react';
import { AppLayout } from './AppLayout';

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
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(Array(9).fill(''));

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
		setIsGameEnded(true);
	}

	if (!isDraw && isGameEnded && !checkVictory()) {
		setIsDraw(true);
	}

	return (
		<AppLayout
			currentPlayer={currentPlayer}
			setCurrentPlayer={setCurrentPlayer}
			isGameEnded={isGameEnded}
			setIsGameEnded={setIsGameEnded}
			isDraw={isDraw}
			setIsDraw={setIsDraw}
			field={field}
			setField={setField}
		/>
	);
};
