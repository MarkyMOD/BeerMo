import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth'
import ProfileScreen from './src/screens/User/ProfileScreens/Profile/Profile'
import FindBeerScreen from './src/screens/User/FindBeerScreens/FindBeer/FindBeer'
import CardDetailScreen from './src/screens/User/SendBeerScreens/CardDetail/CardDetail'
import SideDrawer from './src/screens/SideDrawerScreens/SideDrawer/SideDrawer'
import SettingsScreen from './src/screens/User/SettingsScreens/Settings/Settings'
import VenuesScreen from './src/screens/User/VenuesScreens/Venues/Venues'
import TokensScreen from './src/screens/User/BeerTokenScreens/Tokens/Tokens'
import CreditCardsScreen from './src/screens/User/SendBeerScreens/CreditCards/CreditCards'
import DeleteConfirmationScreen from './src/screens/User/SendBeerScreens/DeleteConfirmation/DeleteConfirmation'
import AddCardScreen from './src/screens/User/SendBeerScreens/AddCard/AddCard'
import SavedCardsScreen from './src/screens/User/SendBeerScreens/SavedCards/SavedCards'
import UserSearchScreen from './src/screens/User/SendBeerScreens/UserSearch/UserSearch'
import ChooseCardScreen from './src/screens/User/SendBeerScreens/ChooseCard/ChooseCard.js'
import RedemptionScreen from './src/screens/User/BeerTokenScreens/Redemption/Redemption.js'
import QRScanScreen from './src/screens/User/BeerTokenScreens/QRScan/QRScan.js'

import configureStore from './src/store/configureStore'
import stripe from 'tipsi-stripe'

// import {YellowBox} from 'react-native'
// console.disableYellowBox = true

stripe.setOptions({
  publishableKey: 'pk_test_DkIxaemOoJsNKejcTXVif5Hs00gjcPuUVn',
})

const store = configureStore()

Navigation.registerComponent("BeerMo.AuthScreen", () => AuthScreen, store, Provider)
Navigation.registerComponent("BeerMo.ProfileScreen", () => ProfileScreen, store, Provider)
Navigation.registerComponent("BeerMo.FindBeerScreen", () => FindBeerScreen, store, Provider)
Navigation.registerComponent("BeerMo.CardDetailScreen", () => CardDetailScreen, store, Provider)
Navigation.registerComponent("BeerMo.SideDrawer", () => SideDrawer, store, Provider)
Navigation.registerComponent("BeerMo.SettingsScreen", () => SettingsScreen)
Navigation.registerComponent("BeerMo.VenuesScreen", () => VenuesScreen)
Navigation.registerComponent("BeerMo.TokensScreen", () => TokensScreen, store, Provider)
Navigation.registerComponent("BeerMo.DeleteConfirmationScreen", () => DeleteConfirmationScreen, store, Provider)
Navigation.registerComponent("BeerMo.CreditCardsScreen", () => CreditCardsScreen, store, Provider)
Navigation.registerComponent("BeerMo.AddCardScreen", () => AddCardScreen, store, Provider)
Navigation.registerComponent("BeerMo.SavedCardsScreen", () => SavedCardsScreen, store, Provider)
Navigation.registerComponent("BeerMo.UserSearchScreen", () => UserSearchScreen, store, Provider)
Navigation.registerComponent("BeerMo.ChooseCardScreen", () => ChooseCardScreen, store, Provider)
Navigation.registerComponent("BeerMo.RedemptionScreen", () => RedemptionScreen, store, Provider)
Navigation.registerComponent("BeerMo.QRScanScreen", () => QRScanScreen, store, Provider)


export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "BeerMo.AuthScreen",
    title: "Login"
  }
})