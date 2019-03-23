import { SIGN_IN } from './actionTypes'

export const setLocalId = (localId) => {
    return {
        type: SIGN_IN,
        localId: localId
    }
}