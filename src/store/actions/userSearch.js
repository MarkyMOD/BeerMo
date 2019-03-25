import { USER_SEARCH } from './actionTypes'

export const searchUsers = userName => {
    return dispatch => {

    }
}

export const storeUserSearchResults = users => {
    return {
        type: USER_SEARCH,
        userArray: users
    }
}