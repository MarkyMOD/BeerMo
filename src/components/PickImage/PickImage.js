import React, { Component } from 'react'
import { View, Image, Button, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker'


class PickImage extends Component {
    state = {
        pickedImage: null
    }

    reset = () => {
        this.setState({
            pickedImage: null
        })
    }

    pickedImageHandler = () => {
        ImagePicker.showImagePicker({title:"Pick an Image", maxWidth: 200, maxHeight: 500}, res => {
            if (res.didCancel){
                console.log("user cancelled")
            } else if (res.error){
                console.log("error", res.error)
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }
                })
                this.props.onImagePicked({uri: res.uri, base64: res.data})
            }
        })
    }

    render () {
        return (
            <View style={styles.container} >
                <View style={styles.placeHolder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>
                <View style={styles.button} >
                    <Button title="Pick Image" color = "rgb(255, 180, 55)" onPress={this.pickedImageHandler} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "60%",
        alignItems: "center"
    },
    placeHolder: {
        top: 4,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 250
    },
    button: {
        margin: 8,
        backgroundColor: "rgba(0, 122, 255, 0.9)",

    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
})

export default PickImage