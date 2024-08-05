import { TodoList } from '../TodoList/TodoList';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<TodoList />
		</div>
	);
};
