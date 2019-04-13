import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native'

import PickLocation from '../../../../components/PickLocation/PickLocation'
import backgroundImage from '../../../../assets/images/barleywine.jpg'


class FindBeerScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#FFFF00",
        statusBarColor: "#FF6600",
        navBarBackgroundColor: "#FF6600"
    }

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0),
        controls: {
            location: {
            value: null,
            valid: false
            }
        }
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                })
            }
        }
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler()
        })
    }
    
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => place.key === key)
        this.props.navigator.push({
            screen: "BeerMo.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        })
    }
    render () {
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnim, 
                transform: [
                    {
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }
                ]
                }} 
            >
                <TouchableOpacity onPress={this.placesSearchHandler} >
                    <View style={styles.searchButton} >
                        <Text style={styles.searchButtonText} >Find Beer</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
        if(this.state.placesLoaded) {
            content = (
                <Animated.View style={{
                    opacity: this.state.placesAnim,
                    }} 
                >
                    <View style={{paddingTop: 190}} >
                        <PickLocation 
                            onLocationPick={this.locationPickedHandler} 
                        />
                    </View>
                </Animated.View>
            )
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
                <View style={this.state.placesLoaded ? null : styles.buttonContainer} >
                    {content}
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderColor: "#FF6600",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "#FF6600",
        fontWeight: "bold",
        fontSize: 26
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    }
})

export default FindBeerScreen