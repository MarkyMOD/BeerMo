import { uiStartLoading, uiStopLoading } from './index'


export const userSignup = userData => {
    return dispatch => {
        return fetch('https://beermo-1552602774929.firebaseio.com/users.json', {
            method: "POST",
            body: {
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                userName: userData.userName,
                dateOfBirth: userData.dateOfBirth
            }
        })
        .then(res => console.log("res", res))
        .catch(err => console.log("err", err))
    }
}
