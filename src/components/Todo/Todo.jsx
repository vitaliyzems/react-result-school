import styles from './Todo.module.css';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { flags } from '..';
import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';

export const Todo = ({ todo }) => {
	const {
		deleteTodo,
		isDeleting,
		isUpdating,
		setFlag,
		setTodoForUpdate,
		completeTodo,
		isCompleting,
	} = useContext(TodoContext);

	const editButtonHandle = () => {
		setFlag(flags.edit);
		setTodoForUpdate(todo);
	};

	const changeHandle = ({ target }) => {
		completeTodo(todo, target.checked);
	};

	return (
		<li>
			<div
				className={[styles.todo, todo.completed ? styles.checked : ''].join(' ')}
			>
				{todo.title}
				<div>
					<input
						disabled={isCompleting || isUpdating || isDeleting}
						type="checkbox"
						checked={todo.completed}
						onChange={changeHandle}
					/>
					<button
						onClick={editButtonHandle}
						disabled={isUpdating || isDeleting || isCompleting}
						className="edit"
					>
						<CiEdit size={'1.5rem'} />
					</button>
					<button
						disabled={isDeleting || isUpdating || isCompleting}
						className="delete"
						onClick={() => deleteTodo(todo.id)}
					>
						<MdDelete size={'1.5rem'} />
					</button>
				</div>
			</div>
		</li>
	);
};
