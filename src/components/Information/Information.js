import { store } from '../../store';
import { InformationLayout } from './InformationLayout';

export const Information = () => {
	const onRepeatButtonClick = () => {
		store.dispatch({ type: 'setCurrentPlayer', payload: 'X' });
		store.dispatch({ type: 'setIsGameEnded', payload: false });
		store.dispatch({ type: 'setIsDraw', payload: false });
		store.dispatch({ type: 'setField', payload: Array(9).fill('') });
	};
	return <InformationLayout onRepeatButtonClick={onRepeatButtonClick} />;
};
