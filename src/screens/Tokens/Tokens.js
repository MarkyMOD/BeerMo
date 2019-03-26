import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native'

import { connect } from 'react-redux'

import HeadingText from '../../components/UI/HeadingText/HeadingText'
import CardList from '../../components/CardList/CardList'
import backgroundImage from '../../assets/images/tokens.jpg'

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
        console.log("hhbjhvjvjgvhbvhhbkbjhouuivygvhjbhkhhojnjkbhvghhbijgivu54576788908765xdtgfcguvhbojnhvugycfxti")
        this.props.navigator.push({
            screen: "BeerMo.RedemptionScreen",
            title: ""
        })
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
                <View style={styles.container} >
                    <HeadingText style={styles.tokenInfo1} >Sent From: {this.props.tokens.sentFrom} </HeadingText>
                    <HeadingText style={styles.tokenInfo2} >Received On: {this.props.tokens.dateSent} </HeadingText>
                    <View style={styles.buttonContainer}>
                        <Button title="Redeem" color="rgb(255, 180, 55)" onPress={this.redeemHandler} />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: 8,
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 8,
        borderWidth: 4,
        borderColor: "#FF6600"
    },
    tokenInfo1: {
        fontSize: 18,
        bottom: 20,
        color: "#FF6600",
        textShadowColor: "#000000",
        textShadowOffset: {width: -.9, height: .9},
        textShadowRadius: 1
    },
    tokenInfo2: {
        fontSize: 18,
        bottom: 40,
        color: "#FF6600",
        textShadowColor: "#000000",
        textShadowOffset: {width: -.9, height: .9},
        textShadowRadius: 1
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    buttonContainer: {
        borderWidth: 3,
        borderColor: "rgb(0, 122, 255)",
        marginRight: 20,
        marginLeft: 20,
        bottom: 30,
        backgroundColor: "rgba(0, 122, 255, 0.9)"
    }
})

const mapStateToProps = state => {
    return {
        tokens: state.tokens.tokens
    }
}

export default connect(mapStateToProps)(TokensScreen)