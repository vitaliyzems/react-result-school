import { CiSearch } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';
import styles from './SearchForm.module.css';
import { useState } from 'react';

export const SearchForm = ({ searchStr, setSearchStr }) => {
	const [showInput, setShowInput] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
	};

	const searchOnClick = () => {
		setShowInput(true);
	};

	const clearOnClick = () => {
		setShowInput(false);
		setSearchStr('');
	};

	return (
		<form className={styles.searchForm} onSubmit={onSubmit}>
			<div>
				<input
					className={showInput ? styles.visible : ''}
					type="text"
					value={searchStr}
					placeholder="Введите строку для происка"
					onChange={({ target }) => setSearchStr(target.value)}
				/>
				{showInput && (
					<button onClick={clearOnClick}>
						<MdClear />
					</button>
				)}
				{!showInput && (
					<button onClick={searchOnClick}>
						<CiSearch />
					</button>
				)}
			</div>
		</form>
	);
};
