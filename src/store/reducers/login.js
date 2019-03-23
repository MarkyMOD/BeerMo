import { SIGN_IN } from '../actions/actionTypes'

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
        default:
            return state
    }
}

export default reducer