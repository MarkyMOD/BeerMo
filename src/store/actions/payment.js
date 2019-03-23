import { ADD_CARD, DELETE_CARD } from './actionTypes'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'


export const addCard = (card, localId) => {

    return dispatch => {
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .then(token => {
                const cardData = {
                    user: localId,
                    number: card.number,
                    expMonth: card.expMonth,
                    expYear: card.expYear,
                    cvc: card.cvc
                }
                return fetch("https://beermo-1552602774929.firebaseio.com/cards.json?auth=" + token, {
                    method: "POST",
                    body: JSON.stringify(cardData)
                }) 

                })
            .catch(() => {
                alert(" NO TOKEN!!")
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes)
                dispatch(uiStopLoading())
            })
            .catch(err => {
                console.log(err)
                dispatch(uiStopLoading())
            })
    }

}

export const getCards = (localId) => {
    return dispatch => {
        
    }
}

export const deleteCard = (key) => {
    return {
        type: DELETE_CARD,
        number: number
    }
}
