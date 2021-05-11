import { LOGIN, LOG_OUT, PULL_ALL_USERS, PULL_USER_INFORMATION, PULL_USER_PROFILES, PULL_USER_ROLE, REGISTER } from "../actions/actionTypes";

const initialState = {
    isAuth: false,
    token: null,
    details: null,
    role: 'USER',
    allUsersArray: null,
    profiles: null
};

export default (state = initialState, {type, payload}) => {
    switch(type){
        case REGISTER:
            return state;
        case LOGIN:
            return {
                ...state, 
                isAuth: true,
                token: payload
            }
        case LOG_OUT:
            return {
                isAuth: false, 
                token: null,
                details: null
            }
        case PULL_USER_INFORMATION:
            return {
                ...state, 
                details: payload
            }
        case PULL_USER_ROLE: {
            return {
                ...state, 
                role: payload
            }
        }
        case PULL_ALL_USERS:
            return {
                ...state, 
                allUsersArray: payload
            }
        case PULL_USER_PROFILES:
            return {
                ...state,
                profiles: payload
            }    
        default:
            return state;
    }
};