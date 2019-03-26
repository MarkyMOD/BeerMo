import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, ImageBackground } from 'react-native'

import { connect } from 'react-redux'

import { searchUsers } from '../../store/actions/index'

import HeadingText from '../../components/UI/HeadingText/HeadingText'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import staves from '../../assets/images/staves.jpg'

class CreditCardsScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#FFFF00",
        statusBarColor: "#FF6600",
        navBarBackgroundColor: "#FF6600"
    }

    state = {
        controls: {
            search: {
                value: null
            }
        }
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    componentDidMount() {
        return fetch()
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

    addCardScreenHandler = key => {
        this.props.navigator.push({
            screen: "BeerMo.AddCardScreen"
        })
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

    savedCardsScreenHandler = number => {
        this.props.navigator.push({
            screen: "BeerMo.SavedCardsScreen",
            title: "Saved Cards"
        })
    }

    updateInputState = (value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    search: {
                        ...prevState.controls.search,
                        value: value
                    }
                }
            }
        })
    }

    searchUserHandler = () => {
        this.props.onUserSearch(this.state.controls.search.value)
        this.props.navigator.push({
            screen: "BeerMo.UserSearchScreen",
            title: "Users Found"
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.subContainer} >
                        < Button
                            title = "Add A Card"
                            onPress = { this.addCardScreenHandler }
                        />
                    </View>
                    <View style={styles.subContainer} >  
                        < Button
                            title = "Saved Cards"
                            onPress = { this.savedCardsScreenHandler }
                        />
                    </View>
                </View>
                <View style={styles.textContainer} >
                    <HeadingText style={{fontSize: 20}} >Send A Beer Token To Another User</HeadingText>
                    <HeadingText style={{fontSize: 20, left: 65, color: "blue"}} >Search by User Name</HeadingText>
                    <DefaultInput 
                        style={{bottom: 20}} 
                        placeholder = "Search Here"
                        value={this.state.controls.search.value}
                        onChangeText={(val) => this.updateInputState(val)} 
                    />
                    <Button 
                        title = "Search"
                        onPress = { this.searchUserHandler }
                    />
                </View>
                <View style={styles.backgroundImage}>
                    <Image source={staves} style={styles.image} >
                    </Image>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    subContainer: {
        flex: 1
    },
    textContainer: {
        flex: 11
    },
    backgroundImage: {
        width: "100%",
        height: 300,
        bottom: 25
    },
    image: {
        width: "100%",
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onUserSearch: userName => dispatch(searchUsers(userName))
    }
}

export default connect(null, mapDispatchToProps)(CreditCardsScreen)