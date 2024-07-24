import { useSelector } from 'react-redux';
import styles from './Field.module.css';
import PropTypes from 'prop-types';
import { fieldSelector } from '../../store/selectors';

export const FieldLayout = ({ onCellClick }) => {
	const field = useSelector(fieldSelector);
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
