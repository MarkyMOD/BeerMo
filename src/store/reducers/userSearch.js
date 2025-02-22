import { USER_SEARCH } from '../actions/actionTypes'

const initialState = {
    userArray: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SEARCH:
            return {
                ...state,
                userArray: action.userArray
            }
        default:
            return state
    }
}

export default reducer