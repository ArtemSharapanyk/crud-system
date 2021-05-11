import { PULL_DASHBOARD_INFO } from "../actions/actionTypes";

const initialState = {
    usersCount: null,
    profilesCount: null,
    profilesUpperEighteen: null
};

export default (state = initialState, {type, payload}) => {
    switch(type){
        case PULL_DASHBOARD_INFO:
            return {
                ...state, 
                usersCount: payload.usersCount,
                profilesCount: payload.profilesCount,
                profilesUpperEighteen: payload.profilesUpperEighteen
            }
        default:
            return state;
    }
}