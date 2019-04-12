import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class DeleteConfirmationScreen extends Component {
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

    cardDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.number)
    this.props.navigator.pop()
    }

    render () {
        return (
            <View style={styles.container} >
                <View style={styles.subContainer}>
                    <View>
                        <Text >Card Number: {this.props.selectedPlace.number}</Text>
                        <Text >Expiration: {this.props.selectedPlace.expMonth}/{this.props.selectedPlace.expYear}</Text >
                        <Text >CVC: {this.props.selectedPlace.cvc}</Text >
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        marginTop: 20,
        width: "100%",
        height: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    }
})

export default DeleteConfirmationScreen