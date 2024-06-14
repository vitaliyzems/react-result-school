import { ref, set } from 'firebase/database';
import { useState } from 'react';
import { database } from '../firebase';

export const useCompleteTodo = () => {
	const [isCompleting, setIsCompleting] = useState(false);

	const completeTodo = (todo, completed) => {
		setIsCompleting(true);

		const { id, title } = todo;
		const todoDbRef = ref(database, `todos/${id}`);

		set(todoDbRef, { title, completed }).finally(() => {
			setIsCompleting(false);
		});
	};

	return { completeTodo, isCompleting };
};
