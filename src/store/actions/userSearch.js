import { USER_SEARCH } from './actionTypes'

import { authGetToken } from './index'

export const searchUsers = userName => {
    return dispatch => {
        let user = userName
        dispatch(authGetToken())
        .then(token => {
            return fetch(`https://beermo-1552602774929.firebaseio.com/users.json?auth=${token}&orderBy="userName"&equalTo="${user}"&print=pretty`)
        })
        .then(res => res.json())
        .then(parsedRes => {
            let data = Object.values(parsedRes)
            let useableData = data[0]
            dispatch(storeUserSearchResults(useableData))
        })
        .catch(err => console.log(err))
    }
}

export const storeUserSearchResults = user => {
    return {
        type: USER_SEARCH,
        userArray: user
    }
}