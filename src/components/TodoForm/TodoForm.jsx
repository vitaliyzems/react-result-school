import { useEffect, useRef, useState } from 'react';
import { inputFlags } from '../../constants';
import styles from './TodoForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewTodoAction,
	setInputFlagAction,
	setTodoForUpdateAction,
	updateTodoAction,
} from '../../store/actions';
import {
	inputFlagSelector,
	isDisabledButtonsSelector,
	todoForUpdateSelector,
} from '../../store/selectors';

export const AddTodoForm = () => {
	const flag = useSelector(inputFlagSelector);
	const todoForUpdate = useSelector(todoForUpdateSelector);
	const isDisabled = useSelector(isDisabledButtonsSelector);

	const dispatch = useDispatch();

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

		const title = newTodoTitle.charAt(0).toUpperCase() + newTodoTitle.slice(1);

		if (flag === inputFlags.add) {
			const newTodo = {
				title,
				completed: false,
				createdAt: Date.now(),
			};
			dispatch(addNewTodoAction(newTodo));
			setNewTodoTitle('');
		} else if (flag === inputFlags.edit) {
			dispatch(
				updateTodoAction({
					...todoForUpdate,
					title,
				}),
			);
			setNewTodoTitle('');
		}
	};

	const onChange = ({ target }) => {
		setTodoError(null);
		setNewTodoTitle(target.value);
	};

	const cancelHandle = () => {
		dispatch(setInputFlagAction(inputFlags.add));
		dispatch(setTodoForUpdateAction(null));
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
			{flag === inputFlags.add && (
				<input disabled={isDisabled} type="submit" value="Добавить" />
			)}
			{flag === inputFlags.edit && (
				<>
					<input
						disabled={isDisabled}
						type="button"
						value="Отменить"
						onClick={cancelHandle}
					/>
					<input disabled={isDisabled} type="submit" value="Редактировать" />
				</>
			)}
			<br />
			<span>{todoError}</span>
		</form>
	);
};
