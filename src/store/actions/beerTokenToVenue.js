import { queryToken, authGetToken } from './index'

export const beerTokenToVenue = (tokenId, userId, venueName) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(authToken => {
                const tokenInfo = {
                    venue: venueName,
                    sentFrom: userId,
                    token: tokenId,
                    dateSent: new Date(),
                    active: true
                }
                return fetch(`https://beermo-1552602774929-a560c.firebaseio.com/${venueName}Tokens.json?auth=${authToken}`, {
                    method: "POST",
                    body: JSON.stringify(tokenInfo)
                })
            })
            .catch(() => {
                alert("SCAN FAILED")
            })
            .then(res => {
                res.json()
            })
            .then(parsedRes => {
                dispatch(queryToken(tokenId))
            })
            .catch(err => {
                console.log("VENUETOKEN ERROR", err)
            })
    }
}