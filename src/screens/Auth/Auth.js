import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import MainText from '../../components/UI/MainText/MainText'
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import validate from '../../utility/validation'
import { tryAuth, authAutoSignin, userSignup } from '../../store/actions/index'
import backgroundImage from '../../assets/images/barleywine.jpg'

class AuthScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#FFFF00",
        statusBarColor: "#FF6600",
        navBarBackgroundColor: "#FF6600"
    }

    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            },
            firstName: {
                value: "",
                valid: false,
                validationRules: {
                    inputType: "string"
                },
                touched: false
            },
            lastName: {
                value: "",
                valid: false,
                validationRules: {
                    inputType: "string"
                },
                touched: false
            },
            userName: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            },
            dateOfBirth: {
                value: "",
                valid: false,
                validationRules: {
                    length: 8,
                    inputType: "number"
                },
                touched: false
            }
        }
    }

    constructor(props){
        super(props)
        Dimensions.addEventListener("change", this.updateStyles)
    }

    componentWillUnmount = () => {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    componentDidMount = () => {
        this.props.onAutoSignin()
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        })
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

    authHandler = () => {

        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            firstName: this.state.controls.firstName.value,
            lastName: this.state.controls.lastName.value,
            userName: this.state.controls.userName.value,
            dateOfBirth: this.state.controls.dateOfBirth.value
        }
        this.props.onTryAuth(authData, this.state.authMode)
        if (this.state.authMode === "signup") {
            // this.props.onUserSignup(signupData)
        }
    }

    updateInputState = (key, value) => {
        let connectedValue = {}
        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo
            const equalValue = this.state.controls[equalControl].value
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if(key === "password"){
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === "password" ?
                            validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValue
                            ) :
                            prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    }

    render () {
        let headingText = null
        let confirmPasswordControl = null
        let submitButton = (
            <CustomButton 
                color = "#FF6600"
                onPress={this.authHandler} 
                disable={
                    !this.state.controls.email.valid
                    || !this.state.controls.password.valid
                    || !this.state.controls.confirmPassword.valid && this.state.authMode === "signup"
                }
            >
                Submit
            </CustomButton>
        )

        if(this.state.viewMode === "portrait"){
            headingText = (
                <MainText>
                    <HeadingText >
                        Please {this.state.authMode === "login" ? "Login" : "Sign Up"}
                    </HeadingText>
                </MainText>
            )
        }

        if(this.state.authMode === "signup"){
            confirmPasswordControl = (
                <View style={
                    this.state.viewMode === "portrait" 
                    ? styles.portraitPasswordWrapper 
                    : styles.landscapePasswordWrapper
                } 
                >
                    <DefaultInput 
                        placeholder = "Confirm Password"
                        placeholderTextColor = "#FF6600"
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                    <DefaultInput 
                        placeholder = "First Name"
                        placeholderTextColor = "#FF6600"
                        style={styles.input}
                        value={this.state.controls.firstName.value}
                        onChangeText={(val) => this.updateInputState("firstName", val)}
                        valid={this.state.controls.firstName.valid}
                        touched={this.state.controls.firstName.touched}
                    />
                    <DefaultInput 
                        placeholder = "Last Name"
                        placeholderTextColor = "#FF6600"
                        style={styles.input}
                        value={this.state.controls.lastName.value}
                        onChangeText={(val) => this.updateInputState("lastName", val)}
                        valid={this.state.controls.lastName.valid}
                        touched={this.state.controls.lastName.touched}
                    />
                    <DefaultInput 
                        placeholder = "User Name"
                        placeholderTextColor = "#FF6600"
                        style={styles.input}
                        value={this.state.controls.userName.value}
                        onChangeText={(val) => this.updateInputState("userName", val)}
                        valid={this.state.controls.userName.valid}
                        touched={this.state.controls.userName.touched}
                    />
                    <DefaultInput 
                        placeholder = "Date Of Birth"
                        placeholderTextColor = "#FF6600"
                        style={styles.input}
                        value={this.state.controls.dateOfBirth.value}
                        onChangeText={(val) => this.updateInputState("dateOfBirth", val)}
                        valid={this.state.controls.dateOfBirth.valid}
                        touched={this.state.controls.dateOfBirth.touched}
                    />
                </View>
            )
        }

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
                <View style={styles.beerMoContainer} >
                    <Text style={styles.beerMoFont} >BeerMo</Text>
                </View>
                <KeyboardAvoidingView 
                    style={styles.container} 
                    behavior="padding"
                >
                    {headingText}
                    <CustomButton 
                        color = "#FF6600"
                        style={{marginTop: 10}}
                        onPress={this.switchAuthModeHandler} 
                    > 
                        Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"} 
                    </CustomButton>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <View style={styles.inputContainer} >
                            <DefaultInput 
                                placeholder="Your email address" 
                                placeholderTextColor = "#FF6600"
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={(val) => this.updateInputState("email", val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            <View style={
                                this.state.viewMode === "portrait" || this.state.authMode === "login"
                                ? styles.portraitPasswordContainer 
                                : styles.landscapePasswordContainer
                            } 
                            >
                                <View style={
                                    this.state.viewMode === "portrait" || this.state.authMode === "login"
                                    ? styles.portraitPasswordWrapper 
                                    : styles.landscapePasswordWrapper
                                } 
                                >
                                    <DefaultInput 
                                        placeholder = "Password" 
                                        placeholderTextColor = "#FF6600"
                                        style={[styles.input]}
                                        value={this.state.controls.password.value}
                                        onChangeText={(val) => this.updateInputState("password", val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        secureTextEntry
                                    />
                                </View>
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {submitButton}
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        bottom: 15
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#FF6600",
        borderRadius: 10,
        borderWidth: 2
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    },
    beerMoFont: {
        top: 37,
        fontSize: 158,
        fontStyle: "italic",
        fontFamily: "somethingwild-Regular",
        color: "#FF6600"
    },
    beerMoContainer: {
        alignItems: "center"
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignin: () => dispatch(authAutoSignin()),
        onUserSignup: signupData => dispatch(userSignup(signupData))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)