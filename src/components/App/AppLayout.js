import styles from './App.module.css';
import { Information } from '../Information/Information';
import { Field } from '../Field/Field';

export const AppLayout = () => {
	return (
		<div className={styles.layout}>
			<Information />
			<Field />
		</div>
	);
};
