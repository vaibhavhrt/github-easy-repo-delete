import * as types from '../actions/auth/types';
const initialState = {
    token: null,
};

export default function(state=initialState, action){
    switch(action.type){
    case types.SET_AUTH_TOKEN:
        return { ...state, token: action.token };
    default:
        return state;
    }
}
