import { store } from '../../store';
import { FieldLayout } from './FieldLayout';

export const Field = () => {
	const onCellClick = (cellIdx) => {
		const { field, currentPlayer, isGameEnded } = store.getState();
		if (field[cellIdx] || isGameEnded) {
			return;
		}
		const newField = field.map((cell, idx) =>
			cellIdx === idx ? currentPlayer : cell,
		);
		store.dispatch({ type: 'setField', payload: newField });
		const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		store.dispatch({ type: 'setCurrentPlayer', payload: newCurrentPlayer });
	};

	return <FieldLayout onCellClick={onCellClick} />;
};
