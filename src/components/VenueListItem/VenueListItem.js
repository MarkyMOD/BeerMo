import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const venueListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem} onPress={props.onItemPressed}>
            <Text >Venue Name: {props.venueName}     Address: {props.venueStreetAddress},{props.venueCity} {props.venueZipCode} </Text>   

        </View>
    </TouchableOpacity>
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
    }
})
export default venueListItem