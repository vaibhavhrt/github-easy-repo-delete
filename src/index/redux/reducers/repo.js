import * as types from '../actions/repo/types';

const initialState = {
    isFetching: false,
    lastUpdated: null,
    error: false,
    errors: {},
    list: [],
    page: 0,
    hasMore: true,
};

export default function repo(state=initialState, action){
    switch(action.type){
    case types.REQUEST_REPO_LIST:
        return { ...state, isFetching: true, error: false, errors: {} };
    case types.RECEIVE_REPO_LIST:
        return { ...state, isFetching: false, lastUpdated: action.receivedAt, list: [...state.list, ...action.data], page: action.page, hasMore: !!(action.data.length > 0) };
    case types.ERROR_REPO_LIST:
        return { ...state, isFetching: false, error: true, errors: action.errors };
    default:
        return state;
    }
}
