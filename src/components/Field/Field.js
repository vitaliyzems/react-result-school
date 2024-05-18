import { FieldLayout } from './FieldLayout';
import PropTypes from 'prop-types';

export const Field = ({
	currentPlayer,
	setCurrentPlayer,
	isGameEnded,
	field,
	setField,
}) => {
	const onCellClick = (cellIdx) => {
		if (field[cellIdx] || isGameEnded) {
			return;
		}
		setField((prev) =>
			prev.map((cell, idx) => (cellIdx === idx ? currentPlayer : cell)),
		);
		setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
	};

	return <FieldLayout field={field} onCellClick={onCellClick} />;
};

Field.propTypes = {
	currentPlayer: PropTypes.oneOf(['X', 'O']),
	setCurrentPlayer: PropTypes.func,
	isGameEnded: PropTypes.bool,
	field: PropTypes.arrayOf(PropTypes.string),
	setField: PropTypes.func,
};
