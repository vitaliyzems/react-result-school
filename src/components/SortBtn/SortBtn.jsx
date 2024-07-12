import { useContext } from 'react';
import styles from './SortBtn.module.css';
import { FaSortAlphaDown } from 'react-icons/fa';
import { MdOutlineSortByAlpha } from 'react-icons/md';
import { TodoContext } from '../../TodoContext';

export const SortBtn = () => {
	const {
		isSorting,
		setIsSorting,
		setRefreshTodos,
		isGettingSortedTodos,
		setIsGettingSortedTodos,
	} = useContext(TodoContext);

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
