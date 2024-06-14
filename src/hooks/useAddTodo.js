import { push, ref } from 'firebase/database';
import { useState } from 'react';
import { database } from '../firebase';

export const useAddTodo = () => {
	const [isCreating, setIsCreating] = useState(false);

	const addNewTodo = (newTodo) => {
		setIsCreating(true);

		const todosDbRef = ref(database, 'todos');

		push(todosDbRef, newTodo)
			.then()
			.finally(() => {
				setIsCreating(false);
			});
	};

	return { addNewTodo, isCreating };
};
