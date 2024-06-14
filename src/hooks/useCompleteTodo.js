import { useState } from 'react';

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
