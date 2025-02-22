import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from './reducers/login'
import uiReducer from './reducers/ui'
import authReducer from './reducers/auth'
import cardsReducer from './reducers/creditCards'
import userReducer from './reducers/userSearch'
import userInfoReducer from './reducers/userInfo'
import tokenReducer from './reducers/tokens'
import venueReducer from './reducers/venues'
import venueNameReducer from './reducers/venueSignIn'

const rootReducer = combineReducers({
    user: loginReducer,
    ui: uiReducer,
    auth: authReducer,
    cards: cardsReducer,
    searchedUser: userReducer,
    userInfo: userInfoReducer,
    tokens: tokenReducer,
    venues: venueReducer,
    venueName: venueNameReducer
})

let composeEnhancers = compose

if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore