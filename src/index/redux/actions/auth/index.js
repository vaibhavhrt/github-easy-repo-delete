import * as types from './types';
import { CALL_API } from '../../middleware/api';
import { onChange } from '../../../../lib/commonMethods';

export const onChangeAuthForm = e => onChange(types.ON_CHANGE_AUTH_FORM, e);

export const setAuthData = () => (dispatch, getStore) => {
    const store = getStore();
    const { data } = store.auth.form;
    return dispatch({
        type: types.SET_AUTH_DATA,
        data,
    });
};

export const fetchRepoList = (next=false) => ({[CALL_API]: {
    types: [types.REQUEST_REPO_LIST, types.RECEIVE_REPO_LIST, types.ERROR_REPO_LIST],
    endpoint: 'user/repos',
}});
