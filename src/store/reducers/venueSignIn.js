import { GET_VENUENAME } from '../actions/actionTypes'

const initialState = {
    venue: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VENUENAME:
            return {
                ...state,
                venue: action.venueArray
            }
        default:
            return state
    }
}

export default reducer