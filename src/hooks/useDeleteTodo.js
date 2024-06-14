import { ref, remove } from 'firebase/database';
import { useState } from 'react';
import { database } from '../firebase';

export const useDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTodo = (todoId) => {
		setIsDeleting(true);

		const deletingTodoRef = ref(database, `todos/${todoId}`);

		remove(deletingTodoRef).finally(() => {
			setIsDeleting(false);
		});
	};

	return { deleteTodo, isDeleting };
};
