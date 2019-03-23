import React, { Component } from 'react'
import { Button } from 'react-native'

class TokensScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#FFFF00",
        statusBarColor: "#FF6600",
        navBarBackgroundColor: "#FF6600"
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
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

    paymentScreenHandler = key => {
        this.props.navigator.push({
            screen: "BeerMo.PaymentScreen"
        })
    }

    render() {
        return (
            < Button
                title = "Add A Card"
                onPress = { this.paymentScreenHandler }
            />
        )
    }
}

export default TokensScreen