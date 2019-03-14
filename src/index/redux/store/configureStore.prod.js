import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index';
import api from '../middleware/api';

export default function configureStore() {
    let store = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware, api)
    );
    return store;
}
