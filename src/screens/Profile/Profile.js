import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

import { addPlace } from '../../store/actions/index'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage'

class ProfileScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#FFFF00",
        statusBarColor: "#FF6600",
        navBarBackgroundColor: "#FF6600"
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    componentWillMount() {
        this.reset()
    }

    reset = () => {
        return this.setState({
            controls: {
                image: {
                    value: null,
                    valid: true
                }
            }
        })
    }

    onNavigatorEvent = event => {
        // if (event.id === "willAppear") {

        // } else if (event.id === "didAppear") {

        // }
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side: "left"
                })
            }
        }       
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    render () {

        return (
            <ScrollView >
                <KeyboardAvoidingView  
                    style={styles.container}
                    behavior = "padding" 
                >
                    <MainText>
                        <HeadingText>Profile Picture</HeadingText>
                    </MainText>
                    <PickImage 
                        onImagePicked={this.imagePickedHandler}
                        // ref = {ref => (this.imagePicker = ref)}
                    />
                    {/* <View style={styles.button} >
                        {submitButton}
                    </View> */}
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeHolder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: (placeName, location, image) => dispatch(updateUser(placeName, location, image)) 
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)