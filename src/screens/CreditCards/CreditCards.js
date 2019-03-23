import React, { Component } from 'react'
import { Button } from 'react-native'

import { connect } from 'react-redux'
import { getCards } from '../../store/actions';

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
        this.props.onLoad(this.props.localId)
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

const mapStateToProps = state => {
    return {
        localId: state.user.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: localId => dispatch(getCards(localId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardsScreen)