import { GET_TOKENS } from '../actions/actionTypes'

const intialState = {
    tokens: {
        dateSent: new Date(1553352203000).toUTCString(),
        sentFrom: "MarkJohn"
    }
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case GET_TOKENS:
            return {
                ...state,
                tokens: action.tokens
                }
        default:
            return state
    }
}

export default reducer