

import { GET_USER } from '../actions/types'
const initialState = {

    users: {}

}



export default function(state = initialState, action) {

  switch(action.type) {

    case GET_USER:   

    return {

        ...state,

        users: action.users

    }

  

    default: return state

}

}