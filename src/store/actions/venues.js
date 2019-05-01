import { GET_VENUES } from './actionTypes'

import { authGetToken } from './index'

export const getVenues = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            return fetch(`https://beermo-1552602774929.firebaseio.com/venues.json?auth=${token}`)
        })
        .then(res => res.json())
        .then(parsedRes => {
            let venueArray = []
            for (let key in parsedRes) {
                venueArray.push(parsedRes[key])
            }
            dispatch(listVenues(venueArray))
        })
        .catch(err => console.log(err))
    }
}

export const listVenues = venues => {
    return {
        type: GET_VENUES,
        venueArray: venues
    }
}