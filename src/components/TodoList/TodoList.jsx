import { Loader, Todo, AddTodoForm, SearchForm, SortBtn } from '../../components';
import styles from './TodoList.module.css';
import { useEffect, useState } from 'react';
import { useGetTodos, useAddTodo, useCompleteTodo, useDebounce } from '../../hooks';

export const TodoList = () => {
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isSorting, setIsSorting] = useState(false);
	const [searchStr, setSearchStr] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);

	const { addNewTodo, isCreating } = useAddTodo(refreshTodos, setRefreshTodos);
	const { completeTodo, isCompleting } = useCompleteTodo(refreshTodos, setRefreshTodos);
	const { todos, loading, isGettingSortedTodos, setIsGettingSortedTodos } = useGetTodos(
		refreshTodos,
		setIsSorting,
	);

	useEffect(() => {
		setFilteredTodos([...todos]);
	}, [todos]);

	useDebounce(
		() => {
			const newFilteredArr = todos.filter((todo) =>
				todo.title.toLowerCase().includes(searchStr.toLowerCase()),
			);
			setFilteredTodos(newFilteredArr);
		},
		[todos, searchStr],
		800,
	);

	if (loading) {
		return <Loader />;
	} else if (todos.length) {
		return (
			<>
				<h1>Список дел:</h1>
				<div className={styles.btnWrapper}>
					<SearchForm searchStr={searchStr} setSearchStr={setSearchStr} />
					<SortBtn
						isSorting={isSorting}
						setIsSorting={setIsSorting}
						setRefreshTodos={setRefreshTodos}
						isGettingSortedTodos={isGettingSortedTodos}
						setIsGettingSortedTodos={setIsGettingSortedTodos}
					/>
				</div>
				<ul className={styles.todoList}>
					{filteredTodos.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							completeTodo={completeTodo}
							isCompleting={isCompleting}
						/>
					))}
					{!filteredTodos.length && <div>Ничего не найдено</div>}
				</ul>
				<AddTodoForm addNewTodo={addNewTodo} isCreating={isCreating} />
			</>
		);
	} else {
		return (
			<>
				<h1>Список дел пуст</h1>
				<AddTodoForm addNewTodo={addNewTodo} isCreating={isCreating} />
			</>
		);
	}
};
