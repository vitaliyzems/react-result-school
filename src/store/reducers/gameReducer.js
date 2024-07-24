import { actionTypes } from '../action-types';

const initialState = {
	isGameEnded: false,
	isDraw: false,
};

export const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_IS_GAME_ENDED:
			return { ...state, isGameEnded: action.payload };

		case actionTypes.SET_IS_DRAW:
			return { ...state, isDraw: action.payload };

		default:
			return state;
	}
};
