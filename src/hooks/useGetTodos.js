import { useState, useEffect } from 'react';

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
