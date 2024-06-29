import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetTodo, useUpdateTodo, useDeleteTodo } from '../../hooks';
import { Loader } from '../../components';
import styles from './TodoPage.module.css';
import { CiEdit } from 'react-icons/ci';
import { MdArrowBack, MdDelete } from 'react-icons/md';

export const TodoPage = () => {
	const [showInput, setShowInput] = useState(false);
	const [refreshTodo, setRefreshTodo] = useState(false);
	const [todoTitle, setTodoTitle] = useState('');
	const { id } = useParams();
	const navigate = useNavigate();

	const { todo, loading } = useGetTodo(id, refreshTodo);
	const { updateTodo, isUpdating } = useUpdateTodo(refreshTodo, setRefreshTodo);
	const { deleteTodo, isDeleting } = useDeleteTodo(refreshTodo, setRefreshTodo);

	if (loading) {
		return <Loader />;
	}

	if (!todo) {
		return <Navigate to={'/'} />;
	}

	const editButtonClickHandle = () => {
		setTodoTitle(todo.title);
		setShowInput(true);
	};

	const clearAndHideInput = () => {
		setShowInput(false);
		setTodoTitle('');
	};

	const cancelButtonClickHandle = () => {
		clearAndHideInput();
	};

	const updateTodoHandle = () => {
		updateTodo(id, { title: todoTitle, completed: false });
		clearAndHideInput();
	};

	return (
		<div className={styles.todoPage}>
			<div className={styles.header}>
				<button onClick={() => navigate(-1, { replace: true })}>
					<MdArrowBack size={30} color="darkcyan" />
				</button>
				<h2>Задача</h2>
			</div>
			<p>{todo.title}</p>
			<div className={styles.buttonWrapper}>
				<button
					onClick={editButtonClickHandle}
					disabled={isUpdating || isDeleting}
					className="edit"
				>
					<CiEdit size={'2rem'} />
				</button>
				<button
					disabled={isDeleting || isUpdating}
					className="delete"
					onClick={() => deleteTodo(id)}
				>
					<MdDelete size={'2rem'} />
				</button>
			</div>
			<form className={showInput ? styles.visible : styles.hidden}>
				<input
					type="text"
					placeholder="Введите todo"
					value={todoTitle}
					onChange={({ target }) => setTodoTitle(target.value)}
				/>
				<input
					disabled={isUpdating}
					type="button"
					value="Отменить"
					onClick={cancelButtonClickHandle}
				/>
				<input
					disabled={isUpdating}
					type="submit"
					value="Редактировать"
					onClick={updateTodoHandle}
				/>
			</form>
		</div>
	);
};
