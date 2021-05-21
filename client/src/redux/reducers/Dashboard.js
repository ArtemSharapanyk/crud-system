import { PULL_DASHBOARD_INFO } from "../actions/actionTypes";

const initialState = {
    usersCount: null,
    profilesCount: null,
    profilesUpperEighteen: null
};

export const Dashboard = (state = initialState, {type, payload}) => {
    switch(type){
        case PULL_DASHBOARD_INFO:
            const {usersCount,profilesCount, profilesUpperEighteen} = payload;

            return {
                ...state, 
                usersCount,
                profilesCount,
                profilesUpperEighteen
            }
        default:
            return state;
    }
}