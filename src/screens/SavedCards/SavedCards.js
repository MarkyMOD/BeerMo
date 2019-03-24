import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getCards } from '../../store/actions';
import CardList from '../../components/CardList/CardList'

class SavedCardsScreen extends Component {
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

    cardSelectedHandler = number => {
        const selPlace = this.props.cards.find(card => card.number === number)
        this.props.navigator.push({
            screen: "BeerMo.CardDetailScreen",
            title: "Saved Card",
            passProps: {
                selectedPlace: selPlace
            }
        })
    }

    render() {
        return (
            <CardList cards={this.props.cards} onCardSelected={this.cardSelectedHandler} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedCardsScreen)