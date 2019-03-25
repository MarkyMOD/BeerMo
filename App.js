import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth'
import ProfileScreen from './src/screens/Profile/Profile'
import FindBeerScreen from './src/screens/FindBeer/FindBeer'
import CardDetailScreen from './src/screens/CardDetail/CardDetail'
import SideDrawer from './src/screens/SideDrawer/SideDrawer'
import SettingsScreen from './src/screens/Settings/Settings'
import VenuesScreen from './src/screens/Venues/Venues'
import TokensScreen from './src/screens/Tokens/Tokens'
import CreditCardsScreen from './src/screens/CreditCards/CreditCards'
import DeleteConfirmationScreen from './src/screens/DeleteConfirmation/DeleteConfirmation'
import AddCardScreen from './src/screens/AddCard/AddCard'
import SavedCardsScreen from './src/screens/SavedCards/SavedCards'
import UserSearchScreen from './src/screens/UserSearch/UserSearch'
import ChooseCardScreen from './src/screens/ChooseCard/ChooseCard.js'

import configureStore from './src/store/configureStore'
import stripe from 'tipsi-stripe'


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
Navigation.registerComponent("BeerMo.TokensScreen", () => TokensScreen)
Navigation.registerComponent("BeerMo.DeleteConfirmationScreen", () => DeleteConfirmationScreen, store, Provider)
Navigation.registerComponent("BeerMo.CreditCardsScreen", () => CreditCardsScreen, store, Provider)
Navigation.registerComponent("BeerMo.AddCardScreen", () => AddCardScreen, store, Provider)
Navigation.registerComponent("BeerMo.SavedCardsScreen", () => SavedCardsScreen, store, Provider)
Navigation.registerComponent("BeerMo.UserSearchScreen", () => UserSearchScreen, store, Provider)
Navigation.registerComponent("BeerMo.ChooseCardScreen", () => ChooseCardScreen, store, Provider)


export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "BeerMo.AuthScreen",
    title: "Login"
  }
})