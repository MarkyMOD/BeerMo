import { GET_VENUENAME } from './actionTypes'

import { authGetToken, updateUserState } from './index'

export const getVenueName = localId => {
    return dispatch => {
        let user = localId
        dispatch(authGetToken())
            .then(token => {
                return fetch(`https://beermo-1552602774929.firebaseio.com/venueEmails.json?auth=${token}&orderBy="user"&equalTo="${user}"&print=pretty`)
            })
            .then(res => res.json())
            .then(parsedRes => {
                let data = Object.values(parsedRes)
                let useableData = data[0]
                console.log("POTTSPOTTS", useableData)
                dispatch(updateVenueState(useableData))
            })
            .catch(err => console.log(err))
    }
}

export const updateVenueState = venueData => {
    return {
        type: GET_VENUENAME,
        venueArray: venueData
    }
}