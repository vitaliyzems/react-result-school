import { useState } from 'react';

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
