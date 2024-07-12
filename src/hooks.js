import { useState, useEffect, useCallback } from 'react';
import { flags } from './components';

export const useGetTodos = (refreshTodos, setIsSorting) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isGettingSortedTodos, setIsGettingSortedTodos] = useState(false);

	const url = `http://localhost:3003/${isGettingSortedTodos ? 'todos?_sort=title' : 'todos'}`;

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
				setIsSorting(false);
			})
			.finally(
				setTimeout(() => {
					setLoading(false);
				}, 2000),
			);
	}, [refreshTodos, setIsSorting, url]);

	return { todos, loading, isGettingSortedTodos, setIsGettingSortedTodos };
};

export const useAddTodo = (refreshTodos, setRefreshTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const addNewTodo = (newTodo) => {
		setIsCreating(true);

		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(newTodo),
		}).finally(() => {
			setRefreshTodos(!refreshTodos);
			setIsCreating(false);
		});
	};

	return { addNewTodo, isCreating };
};

export const useUpdateTodo = (
	refreshTodos,
	setRefreshTodos,
	setFlag,
	setTodoForUpdate,
) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const updateTodo = (todoId, newTodo) => {
		setIsUpdating(true);

		fetch(`http://localhost:3003/todos/${todoId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(newTodo),
		}).finally(() => {
			setIsUpdating(false);
			setFlag(flags.add);
			setRefreshTodos(!refreshTodos);
			setTodoForUpdate(null);
		});
	};

	return { updateTodo, isUpdating };
};

export const useCompleteTodo = (refreshTodos, setRefreshTodos) => {
	const [isCompleting, setIsCompleting] = useState(false);

	const completeTodo = (todo, completed) => {
		setIsCompleting(true);

		fetch(`http://localhost:3003/todos/${todo.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ ...todo, completed }),
		}).finally(() => {
			setIsCompleting(false);
			setRefreshTodos(!refreshTodos);
		});
	};

	return { completeTodo, isCompleting };
};

export const useDeleteTodo = (refreshTodos, setRefreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTodo = (todoId) => {
		setIsDeleting(true);

		fetch(`http://localhost:3003/todos/${todoId}`, { method: 'DELETE' }).finally(
			() => {
				setRefreshTodos(!refreshTodos);
				setIsDeleting(false);
			},
		);
	};

	return { deleteTodo, isDeleting };
};

export const useDebounce = (effect, dependencies, delay) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const callback = useCallback(effect, dependencies);

	useEffect(() => {
		const timeout = setTimeout(callback, delay);
		return () => clearTimeout(timeout);
	}, [callback, delay]);
};
