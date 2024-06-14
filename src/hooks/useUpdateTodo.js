import { useState } from 'react';
import { flags } from '../components';

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
