import { actionTypes } from '../actionTypes';

const initialState = {
	isDisabledButtons: false,
	searchStr: '',
	searchInputValue: '',
	isShowSearchInput: false,
	isSorting: false,
	inputFlag: 'addFlag',
};

export const optionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_IS_DISABLED_BUTTONS:
			return { ...state, isDisabledButtons: action.payload };
		case actionTypes.SET_SEARCH_STR:
			return { ...state, searchStr: action.payload };
		case actionTypes.SET_SEARCH_INPUT_VALUE:
			return { ...state, searchInputValue: action.payload };
		case actionTypes.SET_SHOW_SEARCH_INPUT:
			return { ...state, isShowSearchInput: action.payload };
		case actionTypes.SET_IS_SORTING:
			return { ...state, isSorting: action.payload };
		case actionTypes.SET_INPUT_FLAG:
			return { ...state, inputFlag: action.payload };
		default:
			return state;
	}
};
