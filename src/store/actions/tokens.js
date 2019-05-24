import { GET_TOKENS } from './actionTypes'
import { authGetToken } from './index'

export const getTokens = userId => {
    return dispatch => {
        let id = userId
        dispatch(authGetToken())
            .then(token => {
                return fetch(`https://beermo-1552602774929.firebaseio.com/userTokens.json?auth=${token}&orderBy="receivedBy"&equalTo="${id}"&print=pretty`)
                .then(res => res.json())
                .then(parsedRes => {
                    let tokenList = []
                    for (let key in parsedRes) {
                        tokenList.push(parsedRes[key])
                    }
                    dispatch(filterTokens(tokenList))
                })
            })
    }
}

export const filterTokens = tokenList => {
    return dispatch => {
        let filteredTokenList = []
        for (let i = 0; i < tokenList.length; i++) {
            let values = Object.values(tokenList[i])
            for (let j = 0; j < values.length; j++) {
                if (values[j] === true) {
                    filteredTokenList.push(tokenList[i])
                }
            }
        }
        dispatch(listTokens(filteredTokenList))
    }
}

export const listTokens = tokenList => {
    return {
        type: GET_TOKENS,
        tokenList: tokenList
    }
}