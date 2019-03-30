import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { PaymentCardTextField } from 'tipsi-stripe'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

import { addCard } from '../../store/actions/index'

import { connect } from 'react-redux'
import bcrypt from 'react-native-bcrypt'
import isaac from 'isaac'

class AddCardScreen extends Component {
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
            let cardNumber = ""
            let number = params.number

            for (let i=0; i<number.length; i++) {
                if (i < 12) {
                    cardNumber += "#"
                } else if (i > 11 && i < 16) {
                    cardNumber += number[i]
                    console.log(cardNumber)
                }
            }

            bcrypt.setRandomFallback((len) => {
                const buf = new Uint8Array(len);

                return buf.map(() => Math.floor(isaac.random() * 256));
            })

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(number, salt, function (err, hash) {
                    console.log("hash", hash)
                })
            })
            
            
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        card: {
                            valid: true,
                            number: cardNumber,
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
                <DefaultInput 
                    placeholder = "    BeerMo Name Will Be Used As The Name On Card"
                    placeholderTextColor = "red"
                    style = {styles.nameInput}
                    editable = {false}
                />
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
                <DefaultInput 
                    placeholder = "Billing Address"
                    placeholderTextColor = "#FF6600"
                    style={styles.input}
                />
                <DefaultInput 
                    placeholder = "State"
                    placeholderTextColor = "#FF6600"
                    style={styles.input}
                />
                <DefaultInput 
                    placeholder = "City"
                    placeholderTextColor = "#FF6600"
                    style={styles.input}
                />
                <DefaultInput 
                    placeholder = "Zip Code"
                    placeholderTextColor = "#FF6600"
                    style={styles.input}
                />
                { submitButton }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardInput: {
        padding: 1,
    },
    input: {
        backgroundColor: "#eee",
    },
    nameInput: {
        backgroundColor: "#eee",
        borderColor: "red",
        borderWidth: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCardScreen)
