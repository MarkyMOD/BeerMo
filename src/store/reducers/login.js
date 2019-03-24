import { SIGN_IN, LOG_OUT } from '../actions/actionTypes'

const intialState = {
    localId: null
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                localId: action.localId
                }
        case LOG_OUT:
            return {
                localId: null
            }
        default:
            return state
    }
}

export default reducer