import * as types from './types';
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
