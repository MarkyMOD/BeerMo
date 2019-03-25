import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { getUserInfo } from '../../store/actions/index'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage'
import Icon from 'react-native-vector-icons/Ionicons'

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

    componentDidMount() {
        this.props.onLoad(this.props.localId)
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
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    editUserInfoHandler = () => {
        
    }

    render () {

        return (
            <ScrollView >
                <View  
                    style={styles.container}
                    behavior = "padding" 
                >
                    <MainText>
                        <HeadingText>Profile Picture</HeadingText>
                    </MainText>
                    <PickImage 
                        onImagePicked={this.imagePickedHandler}
                    />
                    <View style={styles.iconContainer} >
                        <HeadingText style={styles.userInfo} >User Name: {this.props.user.userName}</HeadingText>
                        <TouchableOpacity onPress={this.editUserInfoHandler} >
                            <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#FF6600" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer} >
                        <HeadingText style={styles.userInfo} >First Name: {this.props.user.firstName}</HeadingText>
                        <TouchableOpacity onPress={this.editUserInfoHandler} >
                            <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#FF6600" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer} >
                        <HeadingText style={styles.userInfo} >Last Name: {this.props.user.lastName}</HeadingText>
                        <TouchableOpacity onPress={this.editUserInfoHandler} >
                            <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#FF6600" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer} >
                        <HeadingText style={styles.userInfo} >Email: {this.props.user.email}</HeadingText>
                        <TouchableOpacity onPress={this.editUserInfoHandler} >
                            <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#FF6600" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer} >
                        <HeadingText style={styles.userInfo} >Dat of Birth: {this.props.user.dateOfBirth}</HeadingText>
                        <TouchableOpacity onPress={this.editUserInfoHandler} >
                            <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#FF6600" />
                        </TouchableOpacity>
                    </View>



                </View>
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
    },
    userInfo: {
        fontSize: 18
    },
    iconContainer: {
        flex: 1,
        flexDirection: "row"
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        localId: state.user.localId,
        user: state.userInfo.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: localId => dispatch(getUserInfo(localId))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)