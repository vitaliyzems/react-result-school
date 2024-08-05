import styles from './SortBtn.module.css';
import { FaSortAlphaDown } from 'react-icons/fa';
import { MdOutlineSortByAlpha } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSortingAction } from '../../store/actions';
import { isDisabledButtonsSelector, isSortingSelector } from '../../store/selectors';

export const SortBtn = () => {
	const isSorting = useSelector(isSortingSelector);
	const isDisabled = useSelector(isDisabledButtonsSelector);
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(setIsSortingAction(!isSorting));
	};
	return (
		<button disabled={isDisabled} className={styles.sortBtn} onClick={onClick}>
			{isSorting ? <MdOutlineSortByAlpha /> : <FaSortAlphaDown />}
		</button>
	);
};
