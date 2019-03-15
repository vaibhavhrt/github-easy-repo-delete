import * as types from './types';

export const setAuthToken = token => ({
    type: types.SET_AUTH_TOKEN,
    token,
});
