import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import HeadingText from '../../../../components/UI/HeadingText/HeadingText'

class DailyQRCodeScreen extends Component {
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
        let beerToken = this.props.tokenToRedeem
        let venueName = this.props.venueName
        let userId = "USER-" + this.props.localId
        let venueAndToken = venueName.concat("::", beerToken)
        let allInfo = venueAndToken.concat("::", userId)
        return (
            <View style={styles.qrCode}>
                <View style={styles.qr}>
                    <View >
                        <HeadingText style={styles.headingText}>{this.props.venueName}</HeadingText>
                    </View>
                    <View>
                        <QRCode
                            style={{flex:1}}
                            value={allInfo}
                            size={250}
                            bgColor='#FF6600'
                            fgColor='white'
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    qrCode: {
        flex: 1,
        left: 60,
        top: 120
    },
    headingText: {
        alignSelf: "center",
        right: 61,
        color: "black"
    }
})

mapStateToProps = state => {
    return {
        localId: state.user.localId
    }
}

export default connect(mapStateToProps)(DailyQRCodeScreen)