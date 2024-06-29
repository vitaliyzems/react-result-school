import { TodoPage } from '../../pages';
import { PageNotFound } from '../../pages/404/404';
import { TodoList } from '../TodoList/TodoList';
import styles from './App.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<TodoList />} />
				<Route path="/task/:id" element={<TodoPage />} />
				<Route path="/404" element={<PageNotFound />} />
				<Route path="*" element={<Navigate to={'/404'} />} />
			</Routes>
		</div>
	);
};
