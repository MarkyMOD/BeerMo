import React, { Component } from 'react'
import { Modal, View, Image, Button, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps'

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index'

class CardDetail extends Component {
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop()
    }

    onDeleteHandler = () => {
        const selPlace = this.props.selectedPlace
        this.props.navigator.push({
            screen: "BeerMo.DeleteConfirmationScreen",
            title: "Delete Card?",
            passProps: {
                selectedPlace: selPlace
            }
        })
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
                    <View>
                        <TouchableOpacity onPress={this.onDeleteHandler} >
                            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                                <View style={styles.deleteButton} >
                                    <Icon size={30} name={"ios-trash"} color="red" />
                                </View>
                                <View style={styles.deleteButton} >
                                    <Icon size={30} name={"ios-create"} color="blue" />
                                </View>
                            </View>
                        </TouchableOpacity>
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

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
}

export default connect(null, mapDispatchToProps)(CardDetail)