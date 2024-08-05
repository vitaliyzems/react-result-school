import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
	compose,
} from 'redux';
import { todosReducer } from './redusers';
import thunk from 'redux-thunk';
import { optionsReducer } from './redusers/optionsReducer';

const reducer = combineReducers({ todos: todosReducer, options: optionsReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
