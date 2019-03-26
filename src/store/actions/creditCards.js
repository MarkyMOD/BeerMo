import { ADD_CARD, DELETE_CARD, GET_CARDS } from './actionTypes'
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
                    cvc: null
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
        let id = localId
        dispatch(authGetToken())
            .then(token => {
                return fetch(`https://beermo-1552602774929.firebaseio.com/cards.json?auth=${token}&orderBy="user"&equalTo="${id}"&print=pretty`)
                .then(res => res.json())
                .then(parsedRes => {
                    let cardList = []
                    for(let key in parsedRes){
                        cardList.push(parsedRes[key])
                    }
                    console.log(cardList)
                    dispatch(listCreditCards(cardList))
                })
                .catch(err => console.log("err", err))
            })
    }
}

export const listCreditCards = cardList => {
    return {
        type: GET_CARDS,
        cardList: cardList
    }
}

export const deleteCard = (key) => {
    return {
        type: DELETE_CARD,
        number: number
    }
}
