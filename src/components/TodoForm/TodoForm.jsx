import { useEffect, useRef, useState } from 'react';
import { flags } from '..';
import styles from './TodoForm.module.css';

const stringToUpperFirstChar = (str) => {
	const firstChar = str.charAt(0);
	const firstCharUpper = firstChar.toUpperCase();
	const restString = str.slice(1);
	return firstCharUpper + restString;
};

export const AddTodoForm = ({
	flag,
	setFlag,
	addNewTodo,
	updateTodo,
	isCreating,
	isUpdating,
	todoForUpdate,
	setTodoForUpdate,
}) => {
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [todoError, setTodoError] = useState(null);

	const ref = useRef(null);

	useEffect(() => {
		if (todoForUpdate) {
			setNewTodoTitle(todoForUpdate.title);
			ref.current.focus();
		}
	}, [setNewTodoTitle, todoForUpdate]);

	const onSubmit = (event) => {
		event.preventDefault();
		if (!newTodoTitle.length) {
			setTodoError('Поле не должно быть пустым');
			return;
		}
		if (flag === flags.add) {
			addNewTodo({ title: stringToUpperFirstChar(newTodoTitle), completed: false });
		} else if (flag === flags.edit) {
			updateTodo(todoForUpdate.id, { title: newTodoTitle, completed: false });
		}
		setNewTodoTitle('');
	};

	const onChange = ({ target }) => {
		setTodoError(null);
		setNewTodoTitle(target.value);
	};

	const cancelHandle = () => {
		setFlag(flags.add);
		setTodoForUpdate(null);
		setNewTodoTitle('');
	};

	return (
		<form className={styles.todoForm} onSubmit={onSubmit}>
			<input
				type="text"
				placeholder="Введите todo"
				value={newTodoTitle}
				onChange={onChange}
				ref={ref}
			/>
			{flag === flags.add && (
				<input disabled={isCreating} type="submit" value="Добавить" />
			)}
			{flag === flags.edit && (
				<>
					<input
						disabled={isUpdating}
						type="button"
						value="Отменить"
						onClick={cancelHandle}
					/>
					<input disabled={isUpdating} type="submit" value="Редактировать" />
				</>
			)}
			<br />
			<span>{todoError}</span>
		</form>
	);
};
