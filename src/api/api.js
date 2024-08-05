const fetchTodos = (method, payload) => {
	let url = 'http://localhost:8008/todos';
	const init = {
		method,
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	};
	if (method === 'GET') {
		const { isSorting, searchStr } = payload;
		const sorting = isSorting ? '_sort=title' : '_sort=createdAt&_order=desc';
		url += `?${sorting}&title_like=${searchStr}`;
	} else if (method === 'POST') {
		init.body = JSON.stringify(payload);
	} else if (method === 'PUT') {
		url += `/${payload.id}`;
		init.body = JSON.stringify(payload);
	} else if (method === 'DELETE') {
		url += `/${payload}`;
	}
	return fetch(url, init).then((response) => response.json());
};

export const getTodos = (options) => {
	return fetchTodos('GET', options);
};

export const addNewTodo = (newTodo) => {
	return fetchTodos('POST', newTodo);
};

export const updateTodo = (updatedTodo) => {
	return fetchTodos('PUT', updatedTodo);
};

export const deleteTodo = (todoId) => {
	return fetchTodos('DELETE', todoId);
};

export const completeTodo = (todo) => {
	return fetchTodos('PUT', { ...todo, completed: !todo.completed });
};
