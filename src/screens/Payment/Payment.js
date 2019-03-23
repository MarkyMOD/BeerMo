import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
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
    
    state = {
        controls: {
            card: {
                valid: false,
                number: null,
                expMonth: null,
                expYear: null,
                cvc: null
            }
        }
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

    reset = () => {
        return this.setState(prevState => {
            return {
                controls: {
                    card: {
                        valid: false,
                        number: null,
                        expMonth: null,
                        expYear: null,
                        cvc: null
                    }
                }
            }   
        })
    }

    cardAddedHandler = () => {
        this.props.onAddCard(this.state.controls.card, this.props.localId)
        this.reset()
        this.props.navigator.pop()
    }

    validHandler = (valid, params) => {
        if (valid) {
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        card: {
                            valid: true,
                            number: params.number,
                            expMonth: params.expMonth,
                            expYear: params.expYear,
                            cvc: params.cvc
                        }
                    }
                }
            })
        }
    }

    render() {
        let submitButton = (
            < Button
                title = "Add Card"
                onPress = { this.cardAddedHandler }
                disabled = {
                    !this.state.controls.card.valid
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
                    onParamsChange={this.validHandler}
                />
                { submitButton }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardInput: {
        padding: 1,
    }
})

const mapStateToProps = state => {
    return {
        localId: state.user.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddCard: (cardInfo, localId) => dispatch(addCard(cardInfo, localId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)