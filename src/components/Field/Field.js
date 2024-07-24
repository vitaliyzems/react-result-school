import { useDispatch, useSelector } from 'react-redux';
import { FieldLayout } from './FieldLayout';
import {
	fieldSelector,
	isGameEndedSelector,
	playerSelector,
} from '../../store/selectors';
import { setCurrentPlayer, setField } from '../../store/actions';

export const Field = () => {
	const field = useSelector(fieldSelector);
	const currentPlayer = useSelector(playerSelector);
	const isGameEnded = useSelector(isGameEndedSelector);

	const dispatch = useDispatch();

	const onCellClick = (cellIdx) => {
		if (field[cellIdx] || isGameEnded) {
			return;
		}
		const newField = field.map((cell, idx) =>
			cellIdx === idx ? currentPlayer : cell,
		);
		dispatch(setField(newField));
		const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		dispatch(setCurrentPlayer(newCurrentPlayer));
	};

	return <FieldLayout onCellClick={onCellClick} />;
};
