import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import CardList from '../../components/CardList/CardList'
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

    cardSelectedHandler = number => {
        const selPlace = this.props.cards.find(card => card.number === number)
        this.props.navigator.push({
            screen: "BeerMo.CardDetailScreen",
            title: "Saved Card",
            passProps: {
                selectedPlace: selPlace
            }
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.subContainer} >
                        < Button
                            title = "Add A Card"
                            onPress = { this.paymentScreenHandler }
                        />
                    </View>
                    <View style={styles.subContainer} >  
                        < Button
                            title = "Saved Cards"
                            onPress = { this.paymentScreenHandler }
                        />
                    </View>
                </View>
                <CardList cards={this.props.cards} onCardSelected={this.cardSelectedHandler} />
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer: {
        flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardsScreen)