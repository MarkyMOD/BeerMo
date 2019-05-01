import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-map", 30),
        Icon.getImageSource("ios-contact", 30),
        Icon.getImageSource("ios-menu", 30),
        Icon.getImageSource("ios-beer", 30),
        Icon.getImageSource("ios-rocket", 30),
        Icon.getImageSource("ios-gift", 30),
        Icon.getImageSource("ios-settings", 30)
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
                        ],
                        rightButtons: [{
                            icon: sources[6],
                            title: "Settings",
                        }]
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
                        ],
                        rightButtons: [{
                            icon: sources[6],
                            title: "Settings",
                        }]
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
                        }],
                        rightButtons: [{
                            icon: sources[6],
                            title: "Settings",
                        }]
                    }
                }, 
                {
                    screen: "BeerMo.QRScanScreen",
                    label: "Venues",
                    title: "Venues",
                    icon: sources[4],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: sources[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                        }],
                        rightButtons: [{
                            icon: sources[6],
                            title: "Settings",
                        }]
                    }
                }, 
                {
                    screen: "BeerMo.CreditCardsScreen",
                    label: "Send Beer",
                    title: "Gift A Beer",
                    icon: sources[5],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: sources[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                        }],
                        rightButtons: [{
                            icon: sources[6],
                            title: "Settings",
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