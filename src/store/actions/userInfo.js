import { USER_INFO } from './actionTypes'

import { authGetToken } from './index'

export const getUserInfo = localId => {
    return dispatch => {
        let user = localId
        dispatch(authGetToken())
            .then(token => {
                return fetch(`https://beermo-1552602774929.firebaseio.com/users.json?auth=${token}&orderBy="user"&equalTo="${user}"&print=pretty`)
            })
            .then(res => res.json())
            .then(parsedRes => {
                let data = Object.values(parsedRes)
                let useableData = data[0]
                dispatch(updateUserState(useableData))
            })
            .catch(err => console.log(err))
    }
}

export const updateUserState = user => {
    return {
        type: USER_INFO,
        user: user
    }
}