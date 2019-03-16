import * as types from './types';
import { CALL_API } from '../../middleware/api';

export const fetchRepoList = (next=false) => (dispatch, getStore) => {
    let page = 1;
    if(next){
        const store = getStore();
        page = store.repo.page + 1;
    }
    return dispatch({[CALL_API]: {
        types: [types.REQUEST_REPO_LIST, types.RECEIVE_REPO_LIST, types.ERROR_REPO_LIST],
        endpoint: `user/repos?page=${page}`,
        passForward: { page },
    }});
};
