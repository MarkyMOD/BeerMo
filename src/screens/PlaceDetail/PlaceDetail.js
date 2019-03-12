import React, { Component } from 'react'
import { Modal, View, Image, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index'

class PlaceDetail extends Component {
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop()
    }

    render () {
        return (
        // <Modal 
        //     onRequestClose={props.onModalClosed} 
        //     visible={props.selectedPlace !== null} 
        //     animationType="slide" 
        // >
            <View style={styles.container} >
                <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                <Text style={styles.placeName} >{this.props.selectedPlace.name}</Text>
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler} >
                        <View style={styles.deleteButton} >
                            <Icon size={30} name="ios-trash" color="red" />
                        </View>
                    </TouchableOpacity>
                    {/* <Button title="Close" onPress={props.onModalClosed} /> */}
                </View>
            </View>
        // </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    placeImage: {
        marginTop: 20,
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)