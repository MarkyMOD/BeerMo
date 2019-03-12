import { ADD_PLACE, DELETE_PLACE } from './actionTypes'
import placeImage from '../../assets/images/place.jpeg'

export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        placeImage: placeImage
    }
} 

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}
