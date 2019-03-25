import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { connect } from 'react-redux'

import HeadingText from '../../components/UI/HeadingText/HeadingText'
import CardList from '../../components/CardList/CardList'

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

    redeemHandler = () => {

    }

    render() {
        return (
            <View style={styles.container} >
                <HeadingText style={styles.tokenInfo1} >Sent From: {this.props.tokens.sentFrom} </HeadingText>
                <HeadingText style={styles.tokenInfo2} >Received On: {this.props.tokens.dateSent} </HeadingText>
                <View style={{bottom: 60}}>
                    <Button title="Redeem" onPress={() => this.redeemHandler} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: 8,
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 8,
        borderWidth: 3
    },
    tokenInfo1: {
        fontSize: 18,
        bottom: 20
    },
    tokenInfo2: {
        fontSize: 18,
        bottom: 40
    }
})

const mapStateToProps = state => {
    return {
        tokens: state.tokens.tokens
    }
}

export default connect(mapStateToProps)(TokensScreen)