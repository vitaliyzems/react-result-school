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
import { TodoContext } from '../../TodoContext';

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

	const contextValue = {
		isSorting,
		setIsSorting,
		setRefreshTodos,
		isGettingSortedTodos,
		setIsGettingSortedTodos,
		deleteTodo,
		isDeleting,
		isUpdating,
		setFlag,
		setTodoForUpdate,
		completeTodo,
		isCompleting,
		flag,
		addNewTodo,
		isCreating,
		todoForUpdate,
		updateTodo,
		searchStr,
		setSearchStr,
	};

	if (loading) {
		return <Loader />;
	} else if (todos.length) {
		return (
			<TodoContext.Provider value={contextValue}>
				<h1>Список дел:</h1>
				<div className={styles.btnWrapper}>
					<SearchForm />
					<SortBtn />
				</div>
				<ul className={styles.todoList}>
					{filteredTodos.map((todo) => (
						<Todo key={todo.id} todo={todo} />
					))}
					{!filteredTodos.length && <div>Ничего не найдено</div>}
				</ul>
				<AddTodoForm />
			</TodoContext.Provider>
		);
	} else {
		return (
			<TodoContext.Provider value={{ flag, addNewTodo, isCreating, isUpdating }}>
				<h1>Список дел пуст</h1>
				<AddTodoForm />
			</TodoContext.Provider>
		);
	}
};
