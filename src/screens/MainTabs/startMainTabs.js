import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "BeerMo.FindPlaceScreen",
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
                    screen: "BeerMo.SharePlaceScreen",
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
                    screen: "BeerMo.SettingsScreen",
                    label: "Settings",
                    title: "Settings",
                    icon: sources[3],
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