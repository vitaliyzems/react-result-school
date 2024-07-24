import { useDispatch } from 'react-redux';
import { InformationLayout } from './InformationLayout';
import {
	setCurrentPlayer,
	setField,
	setIsDraw,
	setIsGameEnded,
} from '../../store/actions';

export const Information = () => {
	const dispatch = useDispatch();
	const onRepeatButtonClick = () => {
		dispatch(setCurrentPlayer('X'));
		dispatch(setIsGameEnded(false));
		dispatch(setIsDraw(false));
		dispatch(setField(Array(9).fill('')));
	};
	return <InformationLayout onRepeatButtonClick={onRepeatButtonClick} />;
};
