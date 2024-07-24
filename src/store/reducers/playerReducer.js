import { actionTypes } from '../action-types';

const initialState = {
	currentPlayer: 'X',
};

export const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_PLAYER:
			return { ...state, currentPlayer: action.payload };
		default:
			return state;
	}
};
