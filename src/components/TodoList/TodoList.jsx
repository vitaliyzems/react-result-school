import { Loader, Todo, AddTodoForm, SearchForm, SortBtn } from '../../components';
import styles from './TodoList.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	isLoadingTodosSelector,
	isSortingSelector,
	searchStrSelector,
	todosSelector,
} from '../../store/selectors';
import { getTodosAction } from '../../store/actions';

export const TodoList = () => {
	const todos = useSelector(todosSelector);
	const loading = useSelector(isLoadingTodosSelector);
	const isSorting = useSelector(isSortingSelector);
	const searchStr = useSelector(searchStrSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTodosAction({ isSorting, searchStr }));
	}, [dispatch, isSorting, searchStr]);

	if (loading) {
		return <Loader />;
	} else {
		return (
			<>
				<h1>Список дел:</h1>
				{todos.length ? (
					<div className={styles.btnWrapper}>
						<SearchForm />
						<SortBtn />
					</div>
				) : searchStr ? (
					<div className={styles.btnWrapper}>
						<SearchForm />
						<SortBtn />
					</div>
				) : null}
				<ul className={styles.todoList}>
					{todos.length ? (
						todos.map((todo) => <Todo key={todo.id} todo={todo} />)
					) : searchStr ? (
						<div>Ничего не найдено</div>
					) : (
						<h3>Список дел пуст</h3>
					)}
				</ul>
				<AddTodoForm />
			</>
		);
	}
};
