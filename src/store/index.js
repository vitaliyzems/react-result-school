import { combineReducers, legacy_createStore as createStore } from 'redux';
import { fieldReducer, gameReducer, playerReducer } from './reducers';

export const store = createStore(
	combineReducers({ field: fieldReducer, player: playerReducer, game: gameReducer }),
);
