import { store } from '../../store';
import styles from './Field.module.css';
import PropTypes from 'prop-types';

export const FieldLayout = ({ onCellClick }) => {
	const { field } = store.getState();
	return (
		<div className={styles.field}>
			{field.map((cell, idx) => (
				<div key={idx} onClick={() => onCellClick(idx)} className={styles.cell}>
					{cell}
				</div>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
	onCellClick: PropTypes.func,
};
