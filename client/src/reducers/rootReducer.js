   

import { combineReducers } from 'redux'

import authReducer from './authReducer'

import userReducer from './userReducer'



export default combineReducers({

    authentication: authReducer,

    users: userReducer,

})