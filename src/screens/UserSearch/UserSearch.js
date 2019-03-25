import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

import { connect } from 'react-redux'
class UserSearchScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#FFFF00",
        statusBarColor: "#FF6600",
        navBarBackgroundColor: "#FF6600"
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

    render() {
        return (
            <View>
                <Image source={pirateHipster} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.searchedUser.user
    }
}

export default connect(mapStateToProps)(UserSearchScreen)