import { store } from '../../store';
import styles from './Information.module.css';
import PropTypes from 'prop-types';

export const InformationLayout = ({ onRepeatButtonClick }) => {
	const { currentPlayer, isGameEnded, isDraw } = store.getState();
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
