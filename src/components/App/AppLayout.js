import styles from './App.module.css';
import { Information } from '../Information/Information';
import { Field } from '../Field/Field';
import PropTypes from 'prop-types';

export const AppLayout = ({
	currentPlayer,
	setCurrentPlayer,
	isGameEnded,
	setIsGameEnded,
	isDraw,
	setIsDraw,
	field,
	setField,
}) => {
	return (
		<div className={styles.layout}>
			<Information
				currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
				isGameEnded={isGameEnded}
				setIsGameEnded={setIsGameEnded}
				isDraw={isDraw}
				setIsDraw={setIsDraw}
				setField={setField}
			/>
			<Field
				currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
				isGameEnded={isGameEnded}
				setIsGameEnded={setIsGameEnded}
				field={field}
				setField={setField}
			/>
		</div>
	);
};

AppLayout.propTypes = {
	currentPlayer: PropTypes.oneOf(['X', 'O']),
	setCurrentPlayer: PropTypes.func,
	isGameEnded: PropTypes.bool,
	setIsGameEnded: PropTypes.func,
	isDraw: PropTypes.bool,
	setIsDraw: PropTypes.func,
	field: PropTypes.arrayOf(PropTypes.string),
	setField: PropTypes.func,
};
