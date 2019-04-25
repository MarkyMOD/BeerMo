import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getVenues } from '../../../../store/actions/venues'

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

    render() {
        return null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: () => dispatch(getVenues())
    }
}

export default connect(null, mapDispatchToProps)(VenueSelectionScreen)