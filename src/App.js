import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = value.length < 3 ? false : true;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			return;
		}
		setValue(promptValue);
		setError('');
	};

	const onAddButtonClick = () => {
		const newListItem = {
			id: Date.now(),
			value,
			createdAt: new Date().toLocaleString(),
		};
		setList((prev) => [...prev, newListItem]);
		setValue('');
		setError('');
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{!list.length ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map((listItem) => (
							<li key={listItem.id} className={styles['list-item']}>
								{listItem.value}
								<em className={styles['list-date']}>
									{listItem.createdAt}
								</em>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
