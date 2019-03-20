import { ADD_PLACE, DELETE_PLACE } from './actionTypes'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'


export const addPlace = (placeName, location, image) => {
        // return {
        //     type: ADD_PLACE,
        //     placeName: placeName,
        //     location: location,
        //     image: image
        // }
        
        // fetch("https://us-central1-beermo-1552602774929.cloudfunctions.net/storeImage", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         image: image.base64
        //     })
        // })
        
        // .then(res => res.json())
        // .then(parsedRes => {
        // .catch(err => {
        //     console.log(err)
        //     dispatch(uiStopLoading())
        // })

        // One Way to Use Token
    // return (dispatch, getState) => {
    //     dispatch(uiStartLoading())
    //     const token = getState().auth.token
    //     if (!token) {
    //         return
    //     }
    //     const placeData = {
    //         name: placeName,
    //         location: location
    //     };
    //     return fetch("https://beermo-1552602774929.firebaseio.com/places.json?auth=" + token, {
    //         method: "POST",
    //         body: JSON.stringify(placeData)
    //     }) 
    //     .then(res => res.json())
    //     .then(parsedRes => {
    //         console.log(parsedRes)
    //         dispatch(uiStopLoading())
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         dispatch(uiStopLoading())
    //     })
    // }

    return (dispatch) => {
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .then(token => {
                const placeData = {
                    name: placeName,
                    location: location
                }
                return fetch("https://beermo-1552602774929.firebaseio.com/places.json?auth=" + token, {
                    method: "POST",
                    body: JSON.stringify(placeData)
                }) 

                })
            .catch(() => {
                alert(" NO TOKE!!")
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes)
                dispatch(uiStopLoading())
            })
            .catch(err => {
                console.log(err)
                dispatch(uiStopLoading())
            })
    }

}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}
