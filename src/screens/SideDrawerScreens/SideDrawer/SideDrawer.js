import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';

import { authLogout } from '../../../store/actions/index'

class SideDrawer extends Component {
    render () {
        return (
            <View 
                style={[
                    styles.container, 
                    {width: Dimensions.get("window").width * 0.8}
                ]} 
            >
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem} >
                        <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#FF6600" style={styles.drawerItemIcon} />
                        <Text style={{color: "#FF6600"}} >Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "white",
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#eee"
    },
    drawerItemIcon: {
        marginRight: 10
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer)