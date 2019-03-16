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
        endpoint: `user/repos?affiliation=owner&page=${page}`,
        passForward: { page },
    }});
};

export const deleteRepo = id => (dispatch, getStore) => {
    const store = getStore();
    const { list } = store.repo;
    const repo = list.find(x => x.id===id);
    if(!repo) return;
    const endpoint = `repos/${repo.owner.login}/${repo.name}`;
    return dispatch({[CALL_API]: {
        types: [types.REQUEST_DELETE_REPO, types.RECEIVE_DELETE_REPO, types.ERROR_DELETE_REPO],
        endpoint,
        method: 'DELETE',
        passForward: { id: repo.id },
    }});
};
