import { useEffect, useState } from 'react';
import { Todo } from '../../components';
import styles from './TodoList.module.css';

export const TodoList = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then((response) => response.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<>
			<h1>Список дел:</h1>
			<ul className={styles.todoList}>
				{todos.map((todo) => (
					<Todo key={todo.id} title={todo.title} />
				))}
			</ul>
		</>
	);
};
