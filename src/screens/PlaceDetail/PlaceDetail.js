import React, { Component } from 'react'
import { Modal, View, Image, Button, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index'

class PlaceDetail extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    }

    constructor(props) {
        super(props)
        Dimensions.addEventListener("change", this.updateStyles)
    }

    componentWillUnmount = dims => {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

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
            <View style={[
                styles.container,
                this.state.viewMode === "portrait"
                ? styles.portraitContainer
                : styles.landscapeContainer
                ]} 
            >
                <View style={styles.subContainer} >
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName} >{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler} >
                            <View style={styles.deleteButton} >
                                <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red" />
                            </View>
                        </TouchableOpacity>
                        {/* <Button title="Close" onPress={props.onModalClosed} /> */}
                    </View>
                </View>
            </View>
        // </Modal>
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

export default connect(null, mapDispatchToProps)(PlaceDetail)