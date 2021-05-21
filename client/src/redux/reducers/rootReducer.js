import { combineReducers } from "redux";
import {User} from "./User";
import {Dashboard} from './Dashboard';


export const rootReducer = combineReducers({
    User,
    Dashboard
});