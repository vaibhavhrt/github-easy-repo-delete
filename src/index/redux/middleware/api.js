import axios from 'axios';
import { makeErrorObject } from '../../../lib/commonMethods';

let API_ROOT = 'http://127.0.0.1:8000/';
if (process.env.NODE_ENV === 'production') {
    API_ROOT = 'http://recruit-ai.ap-south-1.elasticbeanstalk.com/';
}

// Fetches an API response.
const callApi = (method='POST', endpoint='/', data, headers) => {
    const url = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    return axios({ method, url, data, headers });
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const state = store.getState();
    const { token } = state.auth;
    const headers = token ? { 'Authorization': `Token ${token}` } : undefined;

    let { endpoint } = callAPI;
    const { method='GET', data, types, afterSuccess } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(state);
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const actionWith = data => {
        const finalAction = { ...action, ...data };
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [ requestType, successType, failureType ] = types;
    next(actionWith({ type: requestType }));

    return callApi(method, endpoint, data, headers).then(
        response => {
            next(actionWith({
                type: successType,
                data: response.data,
                receivedAt: Date.now(),
            }));
            if(afterSuccess) afterSuccess(store.getState(), response);
        },
        error => next(actionWith({
            type: failureType,
            errors: makeErrorObject(error),
        })),
    );
};
