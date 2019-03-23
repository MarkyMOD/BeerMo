import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-share-alt" : "ios-contact", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-beer", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-rocket", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-gift", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "BeerMo.FindBeerScreen",
                    label: "Find Beer",
                    title: "Find Beer",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "BeerMo.ProfileScreen",
                    label: "Profile",
                    title: "My Profile",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }, 
                {
                    screen: "BeerMo.TokensScreen",
                    label: "Beer Tokens",
                    title: "Your Beer",
                    icon: sources[3],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: sources[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                        }]
                    }
                }, 
                {
                    screen: "BeerMo.VenuesScreen",
                    label: "Venues",
                    title: "Venues",
                    icon: sources[4],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: sources[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                        }]
                    }
                }, 
                {
                    screen: "BeerMo.PaymentScreen",
                    label: "Send Beer",
                    title: "Gift A Beer",
                    icon: sources[5],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: sources[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                        }]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            drawer: {
                left: {
                    screen: "BeerMo.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            }
        })

    })
}

export default startTabs