import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'

import stripe, { PaymentCardTextField } from 'tipsi-stripe'

import { connect } from 'react-redux'

import { getCards } from '../../../../store/actions/index'

import CardList from '../../../../components/CardList/CardList'
import HeadingText from '../../../../components/UI/HeadingText/HeadingText'

class ChooseCard extends Component {
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

    sendBeerTokenHandler = () => {
        this.props.navigator.pop()
        this.props.navigator.pop()
        alert("Token Sent To Beer Buddy!")
    }

    validHandler = (valid, params) => {
        console.log("number", params.number, "expMonth", params.expMonth, "expYear", params.expYear, "cvc", params.cvc)
        if (valid && params.number.length === 16 && params.expMonth > 0 &&
            params.expYear > 0 && params.cvc.length === 3) {
            
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


    render () {
        let cardList = (
            <View>
                <HeadingText style={{fontSize: 26, left: 14}} > Enter Your Cards Details </HeadingText>
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
                < Button
                    title = "Add Card"
                    onPress = { this.cardAddedHandler }
                    disabled = {
                        !this.state.controls.card.valid
                    }
                />
            </View>
        )

        if (this.props.cards.length > 0 || !this.props.cards) {
            cardList = (
                <View>
                    <HeadingText style={{fontSize: 26}} > Select A Card For Payment </HeadingText>
                    <CardList cards={this.props.cards} onCardSelected={this.sendBeerTokenHandler} />
                    <HeadingText style={{fontSize: 26, left: 37}} > Or, Use A New Card </HeadingText>
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
                    < Button
                        title = "Use This Card"
                        onPress = { this.cardAddedHandler }
                        disabled = {
                            !this.state.controls.card.valid
                        }
                    />
                </View>
            )
        } 

        return (
            <View>
                { cardList }
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
        localId: state.user.localId,
        cards: state.cards.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: localId => dispatch(getCards(localId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCard)