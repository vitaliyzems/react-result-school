import { actionTypes } from '../action-types';

const initialState = {
	field: Array(9).fill(''),
};

export const fieldReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_FIELD:
			return { ...state, field: action.payload };

		default:
			return state;
	}
};
