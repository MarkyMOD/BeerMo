import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native'

import { connect } from 'react-redux'

import { getTokens } from '../../../../store/actions/index'

import TokenList from '../../../../components/TokenList/TokenList'
import backgroundImage from '../../../../assets/images/tokens.jpg'

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

    componentDidMount() {
        this.props.onLoad(this.props.localId)
    }

    redeemHandler = () => {
        this.props.navigator.push({
            screen: "BeerMo.BeerTokenQRCodeScreen",
            title: "Scan Me",
            passProps: {

            }
        })
    }

    render() {
        console.log("tokens", this.props.tokens)
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
                <TokenList tokens={this.props.tokens} onTokenSelected={this.redeemHandler} />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    // container: {
    //     top: 8,
    //     marginRight: 8,
    //     marginLeft: 8,
    //     marginBottom: 8,
    //     borderWidth: 4,
    //     borderColor: "#FF6600"
    // },
    // tokenInfo1: {
    //     fontSize: 18,
    //     bottom: 20,
    //     color: "#FF6600",
    //     textShadowColor: "#000000",
    //     textShadowOffset: {width: -.9, height: .9},
    //     textShadowRadius: 1
    // },
    // tokenInfo2: {
    //     fontSize: 18,
    //     bottom: 40,
    //     color: "#FF6600",
    //     textShadowColor: "#000000",
    //     textShadowOffset: {width: -.9, height: .9},
    //     textShadowRadius: 1
    // },
    backgroundImage: {
        width: "100%",
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        localId: state.user.localId,
        tokens: state.tokens.tokens
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: userId => dispatch(getTokens(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokensScreen)