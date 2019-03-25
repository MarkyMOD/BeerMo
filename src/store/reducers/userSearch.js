import { USER_SEARCH } from '../actions/actionTypes'

const initialState = {
    users: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SEARCH:
            return {
                ...state,
                users: action.userArray
            }
        default:
            return state
    }
}

export default reducer