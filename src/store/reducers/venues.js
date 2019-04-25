import { GET_VENUES } from '../actions/actionTypes'

const initialState = {
    venueArray: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VENUES:
            return {
                ...state,
                venueArray: action.venueArray
            }
        default:
            return state
    }
}

export default reducer