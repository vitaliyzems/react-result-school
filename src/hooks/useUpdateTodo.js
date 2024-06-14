import { useState } from 'react';
import { flags } from '../components';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';

export const useUpdateTodo = (setFlag, setTodoForUpdate) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const updateTodo = (todoId, newTodo) => {
		setIsUpdating(true);

		const todoDbRef = ref(database, `todos/${todoId}`);

		set(todoDbRef, newTodo).finally(() => {
			setIsUpdating(false);
			setFlag(flags.add);
			setTodoForUpdate(null);
		});
	};

	return { updateTodo, isUpdating };
};
