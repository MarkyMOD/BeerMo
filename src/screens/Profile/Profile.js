import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { getUserInfo } from '../../store/actions/index'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage'
import backgroundImage from '../../assets/images/profile-background1.jpg'

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
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
                <ScrollView >
                    <View  
                        style={styles.container}
                        behavior = "padding" 
                    >
                        <MainText>
                            <HeadingText style={{color: "#070005"}} >Profile Picture</HeadingText>
                        </MainText>
                        <PickImage 
                            onImagePicked={this.imagePickedHandler}
                        />
                        <View style={{backgroundColor: "rgba(96, 75, 50, 0.85)", flex: 1}} >
                            <View style={styles.iconContainer} >
                                <HeadingText style={styles.userInfo} >User Name: {this.props.user.userName}</HeadingText>
                                <TouchableOpacity onPress={this.editUserInfoHandler} >
                                    <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#070005" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconContainer} >
                                <HeadingText style={styles.userInfo} >First Name: {this.props.user.firstName}</HeadingText>
                                <TouchableOpacity onPress={this.editUserInfoHandler} >
                                    <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#070005" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconContainer} >
                                <HeadingText style={styles.userInfo} >Last Name: {this.props.user.lastName}</HeadingText>
                                <TouchableOpacity onPress={this.editUserInfoHandler} >
                                    <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#070005" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconContainer} >
                                <HeadingText style={styles.userInfo} >Email: {this.props.user.email}</HeadingText>
                                <TouchableOpacity onPress={this.editUserInfoHandler} >
                                    <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#070005" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconContainer} >
                                <HeadingText style={styles.userInfo} >Dat of Birth: {this.props.user.dateOfBirth}</HeadingText>
                                <TouchableOpacity onPress={this.editUserInfoHandler} >
                                    <Icon style={{top: 15, right: 8}} size={30} name={"ios-create"} color="#070005" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    userInfo: {
        fontSize: 18,
        color: "#070005"
    },
    iconContainer: {
        flex: 1,
        flexDirection: "row"
    },
    backgroundImage: {
        flex: 1
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