import 'babel-polyfill';
import { LOGIN, LOG_OUT, PULL_ALL_USERS, PULL_USER_INFORMATION, PULL_USER_PROFILES, PULL_USER_ROLE, REGISTER } from '../src/redux/actions/actionTypes';
import UserReducer from '../src/redux/reducers/User';

describe('User reducer should handle correctly action:', () => {
    const initialState = {
        isAuth: false,
        token: null,
        details: null,
        role: 'USER',
        allUsersArray: null,
        profiles: null
    };

    const actionCreator = (actionType, payload) => {
        return {
            type: actionType,
            payload
        }
    };

    const createState = action => {
        return UserReducer(initialState, action);
    };

    const compareThink = properties => ({
        ...initialState,
        ...properties
    });


    it(REGISTER, () => {
        expect(createState(actionCreator(REGISTER))).toEqual(initialState);
    });

    it(LOGIN, () => {
        expect(createState(actionCreator(LOGIN, 'token'))).toEqual(compareThink({
            isAuth: true,
            token: 'token'
        }))
    });

    it(LOG_OUT, () => {
        expect(createState(actionCreator(LOG_OUT))).toEqual(initialState);
    });

    it(PULL_USER_INFORMATION, () => {
        expect(createState(actionCreator(PULL_USER_INFORMATION, 'users'))).toEqual(compareThink({
            details: 'users'
        }));
    });

    it(PULL_USER_ROLE, () => {
        expect(createState(actionCreator(PULL_USER_ROLE, 'role'))).toEqual(compareThink({
            role: 'role'
        }));
    });

    it(PULL_ALL_USERS, () => {
        expect(createState(actionCreator(PULL_ALL_USERS, 'all users'))).toEqual(compareThink({
            allUsersArray: 'all users'
        }))
    });

    it(PULL_USER_PROFILES, () => {
        expect(createState(actionCreator(PULL_USER_PROFILES, 'user profiles'))).toEqual(compareThink({
            profiles: 'user profiles'
        }));
    });
});
