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

    setTokenIdHandler = tokenId => {
        const beerTokenId = tokenId
        this.props.navigator.push({
            screen: "BeerMo.VenueSelectionScreen",
            title: "Select Venue",
            passProps: {
                tokenToRedeem: beerTokenId
            }
        })
    }

    render() {
        console.log("tokens", this.props.tokens)
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
                <TokenList tokens={this.props.tokens} onTokenSelected={this.setTokenIdHandler}/>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
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