import { AsyncStorage } from 'react-native'
import { SIGN_IN, LOG_OUT } from './actionTypes'

export const setLocalId = localId => {
    return {
        type: SIGN_IN,
        localId: localId
    }
}

export const storeLocalId = localId => {
    return dispatch => {
        AsyncStorage.setItem("beerMo:user:localId", localId)
        dispatch(setLocalId(localId))
    }
}

export const userGetId = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const localId = getState().user.localId
            if (!localId) {
                let fetchedLocalId;
                AsyncStorage.getItem("beerMo:user:localId")
                .catch(err => reject())
                .then(idFromStorage => {
                    fetchedLocalId = idFromStorage
                    if (!idFromStorage) {
                        reject()
                        return
                    }
                    resolve(fetchedLocalId)
                })
                .catch(err => reject())
            } else {
                resolve(id)
            }           
        })
        .then(localId => {

            AsyncStorage.getItem("beerMo:auth:token")
                .then(token => {
                    if (!token) {
                        dispatch(userClearStorage())
                    } 
                })
                .catch(err => console.log(err))
            if (localId) {
                console.log("id works")
                dispatch(storeLocalId(localId))
                return localId;
            } else {
                dispatch(userClearStorage())
            }
        })
        promise.catch(err => {
            console.log(err)
        })
        .then(id => {
            if (!id) {
                throw(new Error())
            } else {
                return id
            }
        })
        return promise
    }
}

export const userClearStorage = () => {
    return dispatch => {
        dispatch(userLogOut())
        AsyncStorage.removeItem("beerMo:user:localId")
    }
}

export const userLogOut = () => {
    return {
        type: LOG_OUT
    }
}