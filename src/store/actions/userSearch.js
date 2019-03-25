import { USER_SEARCH } from './actionTypes'

import { authGetToken } from './index'

export const searchUsers = userName => {
    return dispatch => {
        let user = userName
        dispatch(authGetToken())
        .then(token => {
            return fetch(`https://beermo-1552602774929.firebaseio.com/users.json?auth=${token}&orderBy="userName"&equalTo="${userName}"&print=pretty`)
        })
        .then(res => res.json())
        .then(parsedRes => console.log(parsedRes))
        .catch(err => console.log(err))
    }
}

export const storeUserSearchResults = users => {
    return {
        type: USER_SEARCH,
        userArray: users
    }
}