// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import { apiSlice } from './api/api';
import auth from './auth';

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({ menu, auth, apiSlice });

export default reducers;
