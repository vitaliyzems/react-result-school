import { useSelector } from 'react-redux';
import styles from './Information.module.css';
import PropTypes from 'prop-types';
import {
	isDrawSelector,
	isGameEndedSelector,
	playerSelector,
} from '../../store/selectors';

export const InformationLayout = ({ onRepeatButtonClick }) => {
	const currentPlayer = useSelector(playerSelector);
	const isGameEnded = useSelector(isGameEndedSelector);
	const isDraw = useSelector(isDrawSelector);
	return (
		<div className={styles.info}>
			{!isGameEnded && (
				<div className={styles['info-field']}>Сейчас ходит: {currentPlayer}</div>
			)}
			{isGameEnded && !isDraw && (
				<div className={styles['info-field']}>
					Победил: {currentPlayer === 'X' ? 'O' : 'X'}
				</div>
			)}
			{isDraw && <div className={styles['info-field']}>Ничья</div>}
			{isGameEnded && (
				<button className={styles['info-button']} onClick={onRepeatButtonClick}>
					Заново
				</button>
			)}
		</div>
	);
};

InformationLayout.propTypes = {
	onRepeatButtonClick: PropTypes.func,
};
