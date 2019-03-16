import { combineReducers } from 'redux';

import auth from './auth';
import repo from './repo';

const rootReducer = combineReducers({
    auth,
    repo,
});

export default rootReducer;
