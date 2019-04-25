import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import { StyleSheet, View } from 'react-native'

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
        console.log("QR props", this.props)
        let hi = "hi"
        return (
            <View style={styles.qrCode}>
                <View style={styles.qr}>
                    <View>
                        <QRCode
                            style={{flex:1}}
                            value={hi}
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
        top: 200
    }
})

export default DailyQRCodeScreen