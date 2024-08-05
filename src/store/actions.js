import { addNewTodo, completeTodo, deleteTodo, getTodos, updateTodo } from '../api/api';
import { inputFlags } from '../constants';
import { actionTypes } from './actionTypes';

export const getTodosAction = (options) => (dispatch) => {
	dispatch(setIsLoadingTodosAction(true));

	return getTodos(options)
		.then((loadedTodos) => {
			dispatch({ type: actionTypes.SET_TODOS, payload: loadedTodos });
		})
		.finally(() => dispatch(setIsLoadingTodosAction(false)));
};

export const addNewTodoAction = (newTodo) => (dispatch) => {
	dispatch(setIsDisabledButtonsAction(true));

	return addNewTodo(newTodo)
		.then((addedTodo) => {
			dispatch({ type: actionTypes.ADD_NEW_TODO, payload: addedTodo });
		})
		.finally(() => {
			dispatch(setIsDisabledButtonsAction(false));
		});
};

export const updateTodoAction = (todoForUpdate) => (dispatch) => {
	dispatch(setIsDisabledButtonsAction(true));

	return updateTodo(todoForUpdate)
		.then((updatedTodo) => {
			dispatch({ type: actionTypes.UPDATE_TODO, payload: updatedTodo });
		})
		.finally(() => {
			dispatch(setInputFlagAction(inputFlags.add));
			dispatch(setTodoForUpdateAction(null));
			dispatch(setIsDisabledButtonsAction(false));
		});
};

export const deleteTodoAction = (todoId) => (dispatch) => {
	dispatch(setIsDisabledButtonsAction(true));

	return deleteTodo(todoId)
		.then(dispatch({ type: actionTypes.DELETE_TODO, payload: todoId }))
		.finally(() => {
			dispatch(setSearchStrAction(''));
			dispatch(setSearchInputValueAction(''));
			dispatch(setIsDisabledButtonsAction(false));
		});
};

export const completeTodoAction = (todo) => (dispatch) => {
	dispatch(setIsDisabledButtonsAction(true));

	return completeTodo(todo)
		.then((completedTodo) => {
			dispatch({ type: actionTypes.COMPLETE_TODO, payload: completedTodo });
		})
		.finally(() => {
			dispatch(setIsDisabledButtonsAction(false));
		});
};

export const setIsLoadingTodosAction = (isLoading) => {
	return { type: actionTypes.SET_LOADING, payload: isLoading };
};

export const setTodoForUpdateAction = (todoForUpdate) => {
	return { type: actionTypes.SET_TODO_FOR_UPDATE, payload: todoForUpdate };
};

export const setIsDisabledButtonsAction = (isDisabled) => {
	return { type: actionTypes.SET_IS_DISABLED_BUTTONS, payload: isDisabled };
};

export const setSearchStrAction = (value) => {
	return { type: actionTypes.SET_SEARCH_STR, payload: value };
};

export const setSearchInputValueAction = (value) => {
	return { type: actionTypes.SET_SEARCH_INPUT_VALUE, payload: value };
};

export const setShowSearchInputAction = (isShowing) => {
	return { type: actionTypes.SET_SHOW_SEARCH_INPUT, payload: isShowing };
};

export const setIsSortingAction = (isSorting) => {
	return { type: actionTypes.SET_IS_SORTING, payload: isSorting };
};

export const setInputFlagAction = (flag) => {
	return { type: actionTypes.SET_INPUT_FLAG, payload: flag };
};
