import { AsyncStorage } from 'react-native'

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, SIGN_IN } from './actionTypes'
import { uiStartLoading, uiStopLoading, storeLocalId, userGetId, userLogOut, userSignup } from './index'

import startMainTabs from '../../screens/MainTabs/startMainTabs'
import App from '../../../App'

const API_KEY = process.env.API_KEY


export const tryAuth = (authData, authMode) => {
    return dispatch => {
        let data = authData
        let mode = authMode
        let localId = null
        dispatch(uiStartLoading())
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY
        if (mode === "signup") {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading())
                if (!parsedRes.idToken) {
                    alert("Auth failed 1")
                } else {
                    dispatch(authStoreToken(
                        parsedRes.idToken,
                        parsedRes.expiresIn,
                        parsedRes.refreshToken
                    ))
                    startMainTabs()
                }
                dispatch(storeLocalId(parsedRes.localId))
            })
            .catch(err => {
                console.log(err)
                alert("Auth failed 2")
                dispatch(uiStopLoading())
            })
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date()
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expiryDate))
        AsyncStorage.setItem("beerMo:auth:token", token)
        AsyncStorage.setItem("beerMo:auth:expiryDate", expiryDate.toString())
        AsyncStorage.setItem("beerMo:auth:refreshToken", refreshToken)
    }
}

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token
            const expiryDate = getState().auth.expiryDate
            if (!token || new Date(expiryDate) <= new Date) {
                let fetchedToken;
                AsyncStorage.getItem("beerMo:auth:token")
                .catch(err => reject())
                .then(tokenFromStorage => {
                    fetchedToken = tokenFromStorage
                    if (!tokenFromStorage) {
                        reject()
                        return
                    }
                    return AsyncStorage.getItem("beerMo:auth:expiryDate")
                })
                .then(expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate))
                    const now = new Date()
                    if (parsedExpiryDate > now) {
                        dispatch(authSetToken(fetchedToken))
                        resolve(fetchedToken)
                    } else {
                        reject()
                    }
                })
                .catch(err => reject())
            } else {
                resolve(token)
            }           
        })
        return promise.catch(err => {
            return AsyncStorage.getItem("beerMo:auth:refreshToken")
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + refreshToken
                        
                    })
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if (parsedRes.id_token) {
                        console.log("REFRESH!!! works")
                        dispatch(authStoreToken(
                            parsedRes.id_token, 
                            parsedRes.expires_in, 
                            parsedRes.refresh_token
                        ))
                        return parsedRes.id_token;
                    } else {
                        dispatch(authClearStorage());
                    }
                })
        })
        .then(token => {
            if (!token) {
                throw(new Error())
            } else {
                return token
            }
        })
    }
}

export const authAutoSignin = () => {
    return dispatch => {
            dispatch(authGetToken())
            .then(token => {
                dispatch(userGetId())
                .then(token => {
                    startMainTabs()
                    // dispatch(userSignup())
                })
            })
        .catch(err => console.log("No USER"))
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("beerMo:auth:token")
        AsyncStorage.removeItem("beerMo:auth:expiryDate")
        return AsyncStorage.removeItem("beerMo:auth:refreshToken")
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {
                App()
            })
        dispatch(authRemoveToken())
        dispatch(userLogOut())
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}
