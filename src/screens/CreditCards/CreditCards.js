import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

class CreditCardsScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#FFFF00",
        statusBarColor: "#FF6600",
        navBarBackgroundColor: "#FF6600"
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    componentDidMount() {
        return fetch()
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                })
            }
        }
    }

    addCardScreenHandler = key => {
        this.props.navigator.push({
            screen: "BeerMo.AddCardScreen"
        })
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                })
            }
        }
    }

    savedCardsScreenHandler = number => {
        this.props.navigator.push({
            screen: "BeerMo.SavedCardsScreen",
            title: "Saved Card"
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.subContainer} >
                        < Button
                            title = "Add A Card"
                            onPress = { this.addCardScreenHandler }
                        />
                    </View>
                    <View style={styles.subContainer} >  
                        < Button
                            title = "Saved Cards"
                            onPress = { this.savedCardsScreenHandler }
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    subContainer: {
        flex: 1,
    }
})

export default connect()(CreditCardsScreen)