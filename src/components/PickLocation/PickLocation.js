import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    Dimensions
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

class PickLocation extends Component {

    componentWillMount = () => {
        this.reset()
    }

    reset = () => {
        this.setState({
            focusedLocation: {
                latitude: 40.0164401,
                longitude: -105.2812565,
                latitudeDelta: 0.0499,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0499
            },
            locationChosen: false
        })
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        })
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }
            this.pickLocationHandler(coordsEvent)
        }, 
        err => {
            console.log(err)
            alert("failes")
        })
    }

    render () {
        let marker = <MapView.Marker
            ref={ref => { this.mark = ref; }}
            title= "Galvanize"
            coordinate={this.state.focusedLocation} 
        />

        return (
            <View style={styles.container}>
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.focusedLocation}
                    region={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    showsUserLocation={true}
                    ref={ref => this.map = ref}
                    onLayout={() => { this.mark.showCallout() }}
                >
                    {marker}
                </MapView>
                <View style={styles.button} >
                    <Button title="Locate Me" color="rgb(255, 59, 48)" onPress={this.getLocationHandler} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 250
    },
    button: {
        margin: 8,
        backgroundColor: "rgba(0, 122, 255, 0.85)",
        borderWidth: 2,
        borderColor: "rgb(0, 122, 255)"
    }
})

export default PickLocation