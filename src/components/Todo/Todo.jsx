import styles from './Todo.module.css';

export const Todo = ({ title }) => {
	return <li className={styles.todo}>{title}</li>;
};
