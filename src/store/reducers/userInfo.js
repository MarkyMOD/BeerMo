import { USER_INFO } from '../actions/actionTypes'

const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export default reducer