import { USER_INFO } from './actionTypes'

export const getUserInfo = localId => {
    return dispatch => {

    }
}

export const updateUserState = user => {
    return {
        type: USER_INFO,
        user: user
    }
}