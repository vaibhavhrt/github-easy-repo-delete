import * as types from '../actions/auth/types';
const initialState = {
    token: null,
    form: { saving: false, error: false, errors: {}, data: {} },
};

export default function(state=initialState, action){
    switch(action.type){
    case types.ON_CHANGE_AUTH_FORM:
        return { ...state, form: { ...state.form, data: { ...state.form.data, [action.name]: action.value } } };
    case types.SET_AUTH_DATA:
        return { ...state, token: action.data.token };
    default:
        return state;
    }
}
