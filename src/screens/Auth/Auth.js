import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native'

import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import MainText from '../../components/UI/MainText/MainText'
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import validate from '../../utility/validation'
import backgroundImage from '../../assets/images/milky-way.jpeg'

class AuthScreen extends Component {
    state = {
        // respStyles: {
        //     pwContainerDirection: "column",
        //     pwContainerJustifyContent: "flex-start",
        //     pwWrapperWidth: "100%"
        // }

        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                }
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

    updateStyles = (dims) => {
        this.setState({
            // respStyles: {
            //     pwContainerDirection: Dimensions.get("window").height > 500 ? "column" : "row",
            //     pwContainerJustifyContent: Dimensions.get("window").height > 500 ? "flex-start" : "space-between",
            //     pwWrapperWidth: Dimensions.get("window").height > 500 ? "100%" : "45%"
            // }

            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        })
    }

    loginHandler = () => {
        startMainTabs()
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
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue)
                    }
                }
            }
        })
    }

    render () {
        let headingText = null

        if(this.state.viewMode === "portrait"){
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            )
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
                <View style={styles.container} >
                    {headingText}
                    < CustomButton color="#29aaf4" onPress={() => alert("hi")} > Switch to Login < /CustomButton>
                    <View style={styles.inputContainer} >
                        <DefaultInput 
                            placeholder="Your email address" 
                            style={styles.input}
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.updateInputState("email", val)}
                            valid={this.state.controls.email.valid}
                        />
                        <View style={
                            // {
                            // flexDirection: this.state.respStyles.pwContainerDirection,
                            // justifyContent: this.state.respStyles.pwContainerJustifyContent
                            // }

                            this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordContainer 
                            : styles.landscapePasswordContainer
                        } 
                        >
                            <View style={
                                // {
                                // width: this.state.respStyles.pwWrapperWidth
                                // }

                                this.state.viewMode === "portrait" 
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper
                            } 
                            >
                                <DefaultInput 
                                    placeholder = "Password" 
                                    style={[styles.input, {borderColor: "red"}]}
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState("password", val)}
                                    valid={this.state.controls.password.valid}
                                />
                            </View>
                            <View style={
                                // {
                                // width: this.state.respStyles.pwWrapperWidth
                                // }

                                this.state.viewMode === "portrait" 
                                ? styles.portraitPasswordWrapper 
                                : styles.landscapePasswordWrapper
                            } 
                            >
                                <DefaultInput 
                                    placeholder = "Confirm Password" 
                                    style={styles.input}
                                    value={this.state.controls.confirmPassword.value}
                                    onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                                    valid={this.state.controls.confirmPassword.valid}
                                />
                            </View>
                        </View>
                    </View>
                    <CustomButton color="#29aaf4" onPress={this.loginHandler} >Submit</CustomButton>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
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
    }
})

export default AuthScreen