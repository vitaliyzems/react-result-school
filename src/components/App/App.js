import { AppLayout } from './AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
	fieldSelector,
	isDrawSelector,
	isGameEndedSelector,
} from '../../store/selectors';
import { setIsDraw, setIsGameEnded } from '../../store/actions';
import { useCallback, useEffect } from 'react';

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
	const field = useSelector(fieldSelector);
	const isGameEnded = useSelector(isGameEndedSelector);
	const isDraw = useSelector(isDrawSelector);

	const dispatch = useDispatch();

	const checkVictory = useCallback(() => {
		for (let pattern of WIN_PATTERNS) {
			if (
				pattern.every((idx) => field[idx] === 'X') ||
				pattern.every((idx) => field[idx] === 'O')
			) {
				return true;
			}
		}
		return false;
	}, [field]);

	useEffect(() => {
		if (!isGameEnded && (checkVictory() || !field.some((cell) => cell === ''))) {
			dispatch(setIsGameEnded(true));
		}
		if (!isDraw && isGameEnded && !checkVictory()) {
			dispatch(setIsDraw(true));
		}
	}, [field, checkVictory, isDraw, isGameEnded, dispatch]);

	return <AppLayout />;
};
