import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import ListItem from '../ListItem/ListItem'

const cardList = props => {

    
    return (
        <FlatList 
            style={styles.listContainer} 
            data={props.cards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(info) => (
                <ListItem 
                    number={info.item.number} 
                    expMonth={info.item.expMonth}
                    expYear={info.item.expYear}
                    onItemPressed={() => props.onCardSelected(info.item.number)} 
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    },
})

export default cardList