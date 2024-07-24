import { actionTypes } from './action-types';

export const setField = (newField) => ({
	type: actionTypes.SET_FIELD,
	payload: newField,
});

export const setCurrentPlayer = (newCurrentPlayer) => ({
	type: actionTypes.SET_CURRENT_PLAYER,
	payload: newCurrentPlayer,
});

export const setIsGameEnded = (isGameEnded) => ({
	type: actionTypes.SET_IS_GAME_ENDED,
	payload: isGameEnded,
});

export const setIsDraw = (isDraw) => ({
	type: actionTypes.SET_IS_DRAW,
	payload: isDraw,
});
