import { actionTypes } from '../actionTypes';

const initialState = {
	todos: [],
	isLoading: false,
	todoForUpdate: null,
};

export const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_TODOS:
			return { ...state, todos: action.payload };
		case actionTypes.SET_LOADING:
			return { ...state, isLoading: action.payload };
		case actionTypes.ADD_NEW_TODO:
			return { ...state, todos: [...state.todos, action.payload] };
		case actionTypes.UPDATE_TODO:
			return {
				...state,
				todos: state.todos.map((todo) => {
					if (todo.id === action.payload.id) {
						return { ...todo, ...action.payload };
					} else {
						return todo;
					}
				}),
			};
		case actionTypes.DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};
		case actionTypes.COMPLETE_TODO:
			return {
				...state,
				todos: state.todos.map((todo) => {
					if (todo.id === action.payload.id) {
						return { ...action.payload };
					} else return todo;
				}),
			};
		case actionTypes.SET_TODO_FOR_UPDATE:
			return { ...state, todoForUpdate: action.payload };

		default:
			return state;
	}
};
