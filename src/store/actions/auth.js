import { TRY_AUTH } from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index'


export const tryAuth = authData => {
    // return {
    //     type: TRY_AUTH,
    //     authData: authData
    // }

    return dispatch => {
        dispatch(authSignup(authData))
    }
}

export const authSignup = authData => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCT7U-QQ5ekM5pQb44tx4rk3sv4a3Qi2_M", {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err)
            alert("Auth failed")
            dispatch(uiStopLoading())
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
            dispatch(uiStopLoading())
        })
    }
}