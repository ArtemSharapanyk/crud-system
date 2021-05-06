import { LOGIN, PULL_USER_INFORMATION, REGISTER } from "../actions/actionTypes";

const initialState = {
    isAuth: false,
    details: null,
    loading: false
};

export default (state = initialState, {type, payload}) => {
    switch(type){
        case REGISTER:
            return state;
        case LOGIN:
            return {
                ...state, 
                isAuth: true
            }
        case PULL_USER_INFORMATION:
            return {
                ...state, 
                details: true
            }
        default:
            return state;
    }
};