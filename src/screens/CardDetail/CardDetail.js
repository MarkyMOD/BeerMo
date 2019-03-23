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

    render () {
        return (
            <View style={styles.container} >
                <View style={styles.subContainer}>
                    <View>
                        <Text >{this.props.selectedPlace.number}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler} >
                            <View style={styles.deleteButton} >
                                <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red" />
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