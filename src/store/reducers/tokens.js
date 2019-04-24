import { GET_TOKENS } from '../actions/actionTypes'

const intialState = {
    tokens: []
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case GET_TOKENS:
            return {
                ...state,
                tokens: action.tokenList
                }
        default:
            return state
    }
}

export default reducer