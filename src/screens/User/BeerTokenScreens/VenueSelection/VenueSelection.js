import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getVenues } from '../../../../store/actions/venues'

import VenueList from '../../../../components/VenueList/VenueList'

class VenueSelectionScreen extends Component {
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
        this.props.onLoad()
    }

    venueSelectedHandler = venueName => {
        let tokenId = this.props.tokenToRedeem
        let venue = venueName
        this.props.navigator.push({
            screen: "BeerMo.BeerTokenQRCodeScreen",
            title: "Scan Me",
            passProps: {
                tokenToRedeem: tokenId,
                venueName: venue
            }
        })
    }

    render() {
        return (
            <VenueList venues={this.props.venues} onVenueSelected={this.venueSelectedHandler} />
        )
    }
}

const mapStateToProps = state => {
    return {
        venues: state.venues.venues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: () => dispatch(getVenues())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueSelectionScreen)