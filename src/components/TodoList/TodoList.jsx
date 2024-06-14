import { Loader, Todo, AddTodoForm, SearchForm, SortBtn } from '../../components';
import styles from './TodoList.module.css';
import { useEffect, useState } from 'react';
import {
	useGetTodos,
	useAddTodo,
	useDeleteTodo,
	useUpdateTodo,
	useCompleteTodo,
	useDebounce,
} from '../../hooks';

export const flags = { add: 'addFlag', edit: 'editFlag' };

export const TodoList = () => {
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [todoForUpdate, setTodoForUpdate] = useState(null);
	const [isSorting, setIsSorting] = useState(false);
	const [searchStr, setSearchStr] = useState('');
	const [flag, setFlag] = useState(flags.add);
	const [filteredTodos, setFilteredTodos] = useState([]);

	const { addNewTodo, isCreating } = useAddTodo(refreshTodos, setRefreshTodos);
	const { deleteTodo, isDeleting } = useDeleteTodo(refreshTodos, setRefreshTodos);
	const { completeTodo, isCompleting } = useCompleteTodo(refreshTodos, setRefreshTodos);
	const { todos, loading, isGettingSortedTodos, setIsGettingSortedTodos } = useGetTodos(
		refreshTodos,
		setIsSorting,
	);
	const { updateTodo, isUpdating } = useUpdateTodo(
		refreshTodos,
		setRefreshTodos,
		setFlag,
		setTodoForUpdate,
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
							deleteTodo={deleteTodo}
							isDeleting={isDeleting}
							isUpdating={isUpdating}
							setFlag={setFlag}
							setTodoForUpdate={setTodoForUpdate}
							completeTodo={completeTodo}
							isCompleting={isCompleting}
						/>
					))}
					{!filteredTodos.length && <div>Ничего не найдено</div>}
				</ul>
				<AddTodoForm
					flag={flag}
					setFlag={setFlag}
					addNewTodo={addNewTodo}
					isCreating={isCreating}
					isUpdating={isUpdating}
					todoForUpdate={todoForUpdate}
					setTodoForUpdate={setTodoForUpdate}
					updateTodo={updateTodo}
				/>
			</>
		);
	} else {
		return (
			<>
				<h1>Список дел пуст</h1>
				<AddTodoForm
					flag={flag}
					addNewTodo={addNewTodo}
					isCreating={isCreating}
					isUpdating={isUpdating}
				/>
			</>
		);
	}
};
