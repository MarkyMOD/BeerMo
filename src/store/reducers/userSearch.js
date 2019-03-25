import { USER_SEARCH } from '../actions/actionTypes'

const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SEARCH:
            return {
                ...state,
                users: action.user
            }
        default:
            return state
    }
}

export default reducer