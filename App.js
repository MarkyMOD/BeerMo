import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth'
import ProfileScreen from './src/screens/Profile/Profile'
import FindBeerScreen from './src/screens/FindBeer/FindBeer'
import CardDetailScreen from './src/screens/CardDetail/CardDetail'
import SideDrawer from './src/screens/SideDrawer/SideDrawer'
import SettingsScreen from './src/screens/Settings/Settings'
import VenuesScreen from './src/screens/Venues/Venues'
import PaymentScreen from './src/screens/Payment/Payment'
import TokensScreen from './src/screens/Tokens/Tokens'
import CreditCardsScreen from './src/screens/CreditCards/CreditCards'
import configureStore from './src/store/configureStore'
import stripe from 'tipsi-stripe'


stripe.setOptions({
  publishableKey: 'pk_test_DkIxaemOoJsNKejcTXVif5Hs00gjcPuUVn',
})

const store = configureStore()

// Register Screens
Navigation.registerComponent("BeerMo.AuthScreen", () => AuthScreen, store, Provider)
Navigation.registerComponent("BeerMo.ProfileScreen", () => ProfileScreen, store, Provider)
Navigation.registerComponent("BeerMo.FindBeerScreen", () => FindBeerScreen, store, Provider)
Navigation.registerComponent("BeerMo.CardDetailScreen", () => CardDetailScreen, store, Provider)
Navigation.registerComponent("BeerMo.SideDrawer", () => SideDrawer, store, Provider)
Navigation.registerComponent("BeerMo.SettingsScreen", () => SettingsScreen)
Navigation.registerComponent("BeerMo.VenuesScreen", () => VenuesScreen)
Navigation.registerComponent("BeerMo.PaymentScreen", () => PaymentScreen, store, Provider)
Navigation.registerComponent("BeerMo.TokensScreen", () => TokensScreen)
Navigation.registerComponent("BeerMo.CreditCardsScreen", () => CreditCardsScreen, store, Provider)





// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "BeerMo.AuthScreen",
    title: "Login"
  }
})