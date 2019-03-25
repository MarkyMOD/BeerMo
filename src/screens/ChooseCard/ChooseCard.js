import React, { Component } from 'react'
import { View } from 'react-native'

import { connect } from 'react-redux'

import { getCards } from '../../store/actions/index'

import CardList from '../../components/CardList/CardList'
import HeadingText from '../../components/UI/HeadingText/HeadingText'

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

    componentDidMount() {
        this.props.onLoad(this.props.localId)
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
        this.props.navigator.pop()
        this.props.navigator.pop()
    }

    render() {

        return (
            <View>
                <HeadingText style={{fontSize: 26}} > Select A Card For Payment </HeadingText>
                <CardList cards={this.props.cards} onCardSelected={this.sendBeerTokenHandler} />
            </View>
        )    
    }
}

const mapStateToProps = state => {
    return {
        localId: state.user.localId,
        cards: state.cards.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: localId => dispatch(getCards(localId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCard)