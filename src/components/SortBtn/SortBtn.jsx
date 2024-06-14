import styles from './SortBtn.module.css';
import { FaSortAlphaDown } from 'react-icons/fa';
import { MdOutlineSortByAlpha } from 'react-icons/md';

export const SortBtn = ({
	isSorting,
	setIsSorting,
	setRefreshTodos,
	isGettingSortedTodos,
	setIsGettingSortedTodos,
}) => {
	const onClick = () => {
		setIsSorting(true);
		setIsGettingSortedTodos(!isGettingSortedTodos);
		setRefreshTodos((prev) => !prev);
	};
	return (
		<button disabled={isSorting} className={styles.sortBtn} onClick={onClick}>
			{isGettingSortedTodos ? <MdOutlineSortByAlpha /> : <FaSortAlphaDown />}
		</button>
	);
};
