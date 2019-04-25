import { GET_VENUES } from '../actions/actionTypes'

const initialState = {
    venues: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VENUES:
            return {
                ...state,
                venues: action.venueArray
            }
        default:
            return state
    }
}

export default reducer