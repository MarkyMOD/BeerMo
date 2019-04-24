import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'

const tokenListItem = (props) => (
        <View style={styles.listItem} >
            <Text >Sent From: {props.sentFrom}          Date Sent: {props.dateSent} </Text>   
            <View style={styles.buttonContainer}>
                <Button title="Redeem" color="rgb(255, 180, 55)" onPress={props.redeemHandler} />
            </View>
        </View>
)

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        margin: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
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