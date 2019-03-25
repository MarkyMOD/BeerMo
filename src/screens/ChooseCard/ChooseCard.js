import React, { Component } from 'react'

import { connect } from 'react-redux'

import CardList from '../../components/CardList/CardList'

class ChooseCard extends Component {
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

    sendBeerTokenHandler = () => {

    }

    render() {

        return (
            <CardList cards={this.props.cards} onCardSelected={this.sendBeerTokenHandler} />
        )    
    }
}

const mapStateToProps = state => {
    return {
        cards: state.cards.cards
    }
}

export default connect(mapStateToProps)(ChooseCard)