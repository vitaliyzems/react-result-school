import { CiSearch } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import styles from './SearchForm.module.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	isDisabledButtonsSelector,
	isShowSearchInputSelector,
	searchInputValueSelector,
} from '../../store/selectors';
import {
	setSearchInputValueAction,
	setSearchStrAction,
	setShowSearchInputAction,
} from '../../store/actions';
import { debounse } from '../../utils';

export const SearchForm = () => {
	const searchInputValue = useSelector(searchInputValueSelector);
	const isShowInput = useSelector(isShowSearchInputSelector);
	const isDisabled = useSelector(isDisabledButtonsSelector);

	const dispatch = useDispatch();

	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const runSearch = (string) => {
		dispatch(setSearchStrAction(string));
	};

	const debounsedSearch = useRef(debounse(runSearch, 1500)).current;

	const onSubmit = (e) => {
		e.preventDefault();
	};

	const searchOnClick = () => {
		dispatch(setShowSearchInputAction(true));
	};

	const clearOnClick = () => {
		dispatch(setShowSearchInputAction(false));
		dispatch(setSearchStrAction(''));
	};

	const searchOnChange = ({ target }) => {
		dispatch(setSearchInputValueAction(target.value));
		debounsedSearch(target.value);
	};

	return (
		<form className={styles.searchForm} onSubmit={onSubmit}>
			<div>
				<input
					className={isShowInput ? styles.visible : ''}
					type="text"
					ref={inputRef}
					value={searchInputValue}
					placeholder="Введите строку для происка"
					onChange={searchOnChange}
				/>
				{isShowInput && (
					<button onClick={clearOnClick}>
						<MdClear />
					</button>
				)}
				{!isShowInput && (
					<button onClick={searchOnClick} disabled={isDisabled}>
						<CiSearch />
					</button>
				)}
			</div>
		</form>
	);
};
