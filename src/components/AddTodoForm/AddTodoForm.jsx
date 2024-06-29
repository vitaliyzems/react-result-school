import { useState } from 'react';
import styles from './AddTodoForm.module.css';

export const AddTodoForm = ({ addNewTodo, isCreating }) => {
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [todoError, setTodoError] = useState(null);

	const onSubmit = (event) => {
		event.preventDefault();
		if (!newTodoTitle.length) {
			setTodoError('Поле не должно быть пустым');
			return;
		}
		addNewTodo({ title: newTodoTitle, completed: false });

		setNewTodoTitle('');
	};

	const onChange = ({ target }) => {
		setTodoError(null);
		setNewTodoTitle(target.value);
	};

	return (
		<form className={styles.todoForm} onSubmit={onSubmit}>
			<input
				type="text"
				placeholder="Введите todo"
				value={newTodoTitle}
				onChange={onChange}
			/>
			<input disabled={isCreating} type="submit" value="Добавить" />
			<br />
			<span>{todoError}</span>
		</form>
	);
};
