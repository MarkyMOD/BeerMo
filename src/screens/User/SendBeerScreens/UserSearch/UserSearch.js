import React, { Component } from 'react'
import { View, StyleSheet, Image, Button, ImageBackground } from 'react-native'

import { connect } from 'react-redux'

import HeadingText from '../../../../components/UI/HeadingText/HeadingText'
import pirateHipster from '../../../../assets/images/BeardEyePatch.jpg'
import background from '../../../../assets/images/barrel-stave.jpg'
class UserSearchScreen extends Component {
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

    chooseCardHandler = () => {
        this.props.navigator.push({
            screen: "BeerMo.ChooseCardScreen",
            title: "Choose Card"
        })
    }

    render() {
        if(!this.props.user) {
            alert("User Not Found")
            this.props.navigator.switchToTab({tabIndex: 0})
            return (
                <HeadingText style={{color: "black"}} >USER NOT FOUND</HeadingText>
            )
        }
        return (
            <ImageBackground source={background} style={styles.backgroundImage} >
                <View style={styles.container}>
                    <View style={styles.placeHolder} >
                        <Image source={pirateHipster} style={styles.profilePicture} />
                    </View>
                    <View>
                        <HeadingText >{this.props.user.userName}</HeadingText>
                    </View>
                    <View>
                        <HeadingText style={{fontSize: 18, top: 18, color: "#FF6600", right: 4}} >
                            {this.props.user.firstName} {this.props.user.lastName}
                        </HeadingText>
                    </View>
                    <View style={{right: 4, backgroundColor: "rgba(0, 122, 255, 0.9)"}} >
                        <Button 
                        title = "Beer This Adult"
                        onPress = { this.chooseCardHandler }
                        color = "rgb(255, 180, 55)"
                        />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        left: 73,
        top: 50,
        width: "60%",
        alignItems: "center"
    },
    placeHolder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 270
    },
    profilePicture: {
        width: "100%",
        height: "100%"
    },
    textStyling: {
        paddingTop: 20,
        fontSize: 18
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        user: state.searchedUser.userArray
    }
}

export default connect(mapStateToProps)(UserSearchScreen)