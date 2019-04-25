import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'

import HeadingText from '../UI/HeadingText/HeadingText'

const tokenListItem = (props) => (
        <View style={styles.container} >
            <HeadingText style={styles.tokenInfo1} >Sent From: {props.sentFrom} </HeadingText>
            <HeadingText style={styles.tokenInfo2} >Received On: {props.dateSent} </HeadingText>
            <View style={styles.buttonContainer}>
                <Button title="Redeem" color="rgb(255, 180, 55)" onPress={props.onItemPressed} />
            </View>
        </View>
)

const styles = StyleSheet.create({
    container: {
        top: 8,
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 8,
        borderWidth: 4,
        borderColor: "#FF6600"
    },
    tokenInfo1: {
        fontSize: 18,
        bottom: 20,
        color: "#FF6600",
        textShadowColor: "#000000",
        textShadowOffset: {width: -.9, height: .9},
        textShadowRadius: 1
    },
    tokenInfo2: {
        fontSize: 18,
        bottom: 40,
        color: "#FF6600",
        textShadowColor: "#000000",
        textShadowOffset: {width: -.9, height: .9},
        textShadowRadius: 1
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    buttonContainer: {
        borderWidth: 3,
        borderColor: "rgb(0, 122, 255)",
        marginRight: 20,
        marginLeft: 20,
        bottom: 30,
        backgroundColor: "rgba(0, 122, 255, 0.9)"
    }
})
export default tokenListItem