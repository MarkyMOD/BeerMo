import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { PaymentCardTextField } from 'tipsi-stripe'
import HeadingText from '../../components/UI/HeadingText/HeadingText'

import { addCard } from '../../store/actions/index'


import { connect } from 'react-redux' 

class PaymentScreen extends Component {
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

    change = () => {

    }
    

    cardAddedHandler = (valid, params) => {
        // this.props.onAddPlace(
        //     this.state.controls.placeName.value, 
        //     this.state.controls.location.value,
        //     this.state.controls.image.value
        // )
        // this.reset()
        // this.imagePicker.reset()
        // this.locationPicker.reset()
        // this.props.navigator.switchToTab({tabIndex: 0})
        console.log("valid", valid, "params", params)
        if (valid) {

        }
    }

    render() {
        let submitButton = (
            < Button
                title = "Share Place"
                onPress = { this.placeAddedHandler }
                disabled = {
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        )

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <View>
                <HeadingText>ADD A CARD</HeadingText>
                <PaymentCardTextField
                    style={styles.cardInput}
                    cursorColor={"red"}
                    textErrorColor={"red"}
                    placeholderColor={"blue"}
                    keyboardAppearance={"dark"}
                    numberPlaceholder={"CARD NUMBER"}
                    expirationPlaceholder={"EXP"}
                    cvcPlaceholder={"CVC"}
                    disabled={false}
                    onParamsChange={this.cardAddedHandler}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardInput: {
        padding: 1,
    }
})

const mapDispatchToProps = card => {
    return {
        onAddCard: (cardInfo, localId) => dispatch(addCard(cardInfo, localId))
    }
}

export default connect(null, mapDispatchToProps)(PaymentScreen)