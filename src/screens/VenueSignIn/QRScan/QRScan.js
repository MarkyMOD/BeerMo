import React, { Component } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'

import { connect } from 'react-redux'
class QRScanScreen extends Component {
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

    componentDidMount() {

    }

    scanHandler = qrData => {
        let array = qrData.split("::")
        console.log("venueName", this.props.venue.venueName)
        let tokenId
        let userId
        let venue
        for (let i=0; i<array.length; i++) {
            if (array[i].length === 36) {
                tokenId = array[i]
            }
            if (array[i].includes("USER-")) {
                userId = array[i].substring(5)
            }
            if (array[i] === this.props.venue.venueName) {
                venue = array[i]
            }
        }

        if (!tokenId) {
            alert("Beer Token Data Not Received")
        }
        if (!userId) {
            alert("Cannot Determine User Sending Token")
        }
        if (!venue) {
            alert("Venue Name Does Not Match. Make Sure The Customer Has Selected Your Venue")
        }
        this.props.sendBeerToken(tokenId, userId, venue)
    }

    render () {
        return (
                <QRCodeScanner
                    onRead={(e) => (this.scanHandler(e.data))}
            />
        )
        
    }
}

const mapStateToProps = state => {
    return {
        venue: state.venueName.venue
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScanScreen)