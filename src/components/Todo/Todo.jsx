import styles from './Todo.module.css';
import { Link } from 'react-router-dom';

export const Todo = ({ todo, completeTodo, isCompleting }) => {
	const changeHandle = ({ target }) => {
		completeTodo(todo, target.checked);
	};

	return (
		<li className={[styles.todo, todo.completed ? styles.checked : ''].join(' ')}>
			<div>
				<Link to={`/task/${todo.id}`}>{todo.title}</Link>
				<input
					disabled={isCompleting}
					type="checkbox"
					checked={todo.completed}
					onChange={changeHandle}
				/>
			</div>
		</li>
	);
};
