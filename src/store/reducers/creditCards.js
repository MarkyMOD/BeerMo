import { ADD_CARD, DELETE_CARD, GET_CARDS } from '../actions/actionTypes'

const intialState = {
    cards: []
}

const reducer = (state = intialState, action) => {
    console.log(state, action)
    switch (action.type) {
        case GET_CARDS:
            return {
                ...state,
                cards: action.cardList
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