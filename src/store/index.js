import { legacy_createStore as createStore } from 'redux';

const initialState = {
	field: Array(9).fill(''),
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'setField':
			return { ...state, field: action.payload };

		case 'setCurrentPlayer':
			return { ...state, currentPlayer: action.payload };

		case 'setIsGameEnded':
			return { ...state, isGameEnded: action.payload };

		case 'setIsDraw':
			return { ...state, isDraw: action.payload };

		default:
			return state;
	}
};

export const store = createStore(reducer);
