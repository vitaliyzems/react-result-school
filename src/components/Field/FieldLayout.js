import styles from './Field.module.css';
import PropTypes from 'prop-types';

export const FieldLayout = ({ field, onCellClick }) => {
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
	field: PropTypes.arrayOf(PropTypes.string),
	onCellClick: PropTypes.func,
};
