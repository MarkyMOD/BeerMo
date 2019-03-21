import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail'
import SideDrawer from './src/screens/SideDrawer/SideDrawer'
import Settings from './src/screens/Settings/Settings'
import configureStore from './src/store/configureStore'

const store = configureStore()

// Register Screens
Navigation.registerComponent("BeerMo.AuthScreen", () => AuthScreen, store, Provider)
Navigation.registerComponent("BeerMo.SharePlaceScreen", () => SharePlaceScreen, store, Provider)
Navigation.registerComponent("BeerMo.FindPlaceScreen", () => FindPlaceScreen, store, Provider)
Navigation.registerComponent("BeerMo.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider)
Navigation.registerComponent("BeerMo.SideDrawer", () => SideDrawer, store, Provider)
Navigation.registerComponent("BeerMo.SettingsScreen", () => Settings)



// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "BeerMo.AuthScreen",
    title: "Login"
  }
})