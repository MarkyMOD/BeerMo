import { authGetToken } from './index'

export const queryToken = tokenId => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch(`https://beermo-1552602774929.firebaseio.com/userTokens.json?auth=${token}&orderBy="tokenId"&equalTo="${tokenId}"&print=pretty`)
            .catch(err => {
                console.log("GET TOKEN QUERY ERROR 1", err)
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(spentToken(parsedRes))
            })
            .catch(err => {
                console.log("GET TOKEN QUERY ERROR 2", err)
            })
        })
    }
}

export const spentToken = userTokenObject => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            let objectKey = Object.keys(userTokenObject)
            userTokenObject[objectKey].active = false
            let beerTokenId = userTokenObject[objectKey].tokenId
            userTokenObject[objectKey].tokenId = beerTokenId + "###"
            let data = userTokenObject
            console.log("DATA QUERY TOKEN", data)
            return fetch(`https://beermo-1552602774929.firebaseio.com/userTokens.json?auth=${token}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify(data)
            })
            .catch(err => {
                console.log("DEACTIVATE USER BEER TOKEN ERROR 1", err)
            })
            .then(res => console.log("RESRESRES", res))
            .then(parsedRes => {
                console.log("DEACTIVATE USER BEER TOKEN", parsedRes)
            })
            .catch(err => {
                console.log("DEACTIVATE USER BEER TOKEN ERROR 2", err)
            })
        })
    }
}
    