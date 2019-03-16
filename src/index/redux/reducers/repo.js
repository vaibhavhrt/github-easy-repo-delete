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
    case types.REQUEST_DELETE_REPO:
        return requestDeleteRepo(state, action);
    case types.RECEIVE_DELETE_REPO:
        return { ...state, list: state.list.filter(x => x.id!==action.id) };
    case types.ERROR_DELETE_REPO:
        return errorDeleteRepo(state, action);
    default:
        return state;
    }
}

const requestDeleteRepo = (state, action) => {
    const index = state.list.findIndex(x => x.id===action.id);
    return {
        ...state,
        list: [
            ...state.list.slice(0, index),
            { ...state.list[index], isDeleting: true },
            ...state.list.slice(index+1),
        ],
    };
};

const errorDeleteRepo = (state, action) => {
    const index = state.list.findIndex(x => x.id===action.id);
    return {
        ...state,
        list: [
            ...state.list.slice(0, index),
            { ...state.list[index], isDeleting: false, deleteError: action.errors },
            ...state.list.slice(index+1),
        ],
    };
};
