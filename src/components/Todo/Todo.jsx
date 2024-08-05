import styles from './Todo.module.css';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
	completeTodoAction,
	deleteTodoAction,
	setInputFlagAction,
	setShowSearchInputAction,
	setTodoForUpdateAction,
} from '../../store/actions';
import { inputFlags } from '../../constants';
import { isDisabledButtonsSelector } from '../../store/selectors';

export const Todo = ({ todo }) => {
	const isDisabled = useSelector(isDisabledButtonsSelector);
	const dispatch = useDispatch();

	const editButtonHandle = () => {
		dispatch(setShowSearchInputAction(false));
		dispatch(setInputFlagAction(inputFlags.edit));
		dispatch(setTodoForUpdateAction(todo));
	};

	const deleteButtonHandle = () => {
		dispatch(setShowSearchInputAction(false));
		dispatch(deleteTodoAction(todo.id));
	};

	const changeHandle = () => {
		dispatch(setShowSearchInputAction(false));
		dispatch(completeTodoAction(todo));
	};

	return (
		<li>
			<div
				className={[styles.todo, todo.completed ? styles.checked : ''].join(' ')}
			>
				{todo.title}
				<div>
					<input
						disabled={isDisabled}
						type="checkbox"
						checked={todo.completed}
						onChange={changeHandle}
					/>
					<button
						onClick={editButtonHandle}
						disabled={isDisabled}
						className="edit"
					>
						<CiEdit size={'1.5rem'} />
					</button>
					<button
						disabled={isDisabled}
						className="delete"
						onClick={deleteButtonHandle}
					>
						<MdDelete size={'1.5rem'} />
					</button>
				</div>
			</div>
		</li>
	);
};
