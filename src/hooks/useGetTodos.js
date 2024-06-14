import { onValue, orderByChild, query, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { database } from '../firebase';

export const useGetTodos = (setIsSorting) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isGettingSortedTodos, setIsGettingSortedTodos] = useState(false);

	useEffect(() => {
		setLoading(true);

		const todosDbRef = ref(database, 'todos');
		const todosDbQuery = isGettingSortedTodos
			? query(todosDbRef, orderByChild('title'))
			: todosDbRef;

		return onValue(todosDbQuery, (snapshot) => {
			const loadedTodos = [];
			snapshot.forEach((todo) => {
				loadedTodos.push({ id: todo.key, ...todo.val() });
			});

			setTodos(loadedTodos);
			setIsSorting(false);
			setLoading(false);
		});
	}, [isGettingSortedTodos, setIsSorting]);

	return { todos, loading, isGettingSortedTodos, setIsGettingSortedTodos };
};
