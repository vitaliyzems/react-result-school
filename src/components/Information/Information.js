import { InformationLayout } from './InformationLayout';
import PropTypes from 'prop-types';

export const Information = ({
	currentPlayer,
	setCurrentPlayer,
	isGameEnded,
	setIsGameEnded,
	isDraw,
	setIsDraw,
	setField,
}) => {
	const onRepeatButtonClick = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(Array(9).fill(''));
	};
	return (
		<InformationLayout
			currentPlayer={currentPlayer}
			isGameEnded={isGameEnded}
			isDraw={isDraw}
			onRepeatButtonClick={onRepeatButtonClick}
		/>
	);
};

Information.propTypes = {
	currentPlayer: PropTypes.oneOf(['X', 'O']),
	setCurrentPlayer: PropTypes.func,
	isGameEnded: PropTypes.bool,
	setIsGameEnded: PropTypes.func,
	isDraw: PropTypes.bool,
	setIsDraw: PropTypes.func,
	setField: PropTypes.func,
};
