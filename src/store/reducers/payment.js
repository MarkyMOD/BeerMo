import { ADD_CARD, DELETE_CARD } from '../actions/actionTypes'

const intialState = {
    cards: []
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                cards: state.places.concat({
                    number: action.number,
                    expMonth: action.expMonth,
                    expYear: action.expYear,
                    cvc: action.cvc
                })
                }
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => {
                    return card.number !== action.number
                })
        }
        default:
            return state
    }
}

export default reducer