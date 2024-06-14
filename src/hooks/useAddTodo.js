import { useState } from 'react';

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
