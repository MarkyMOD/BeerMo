import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import TokenListItem from '../TokenListItem/TokenListItem'

const tokenList = props => {

    
    return (
        <FlatList 
            style={styles.listContainer} 
            data={props.tokens}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(info) => (
                <TokenListItem 
                    sentFrom={info.item.sentFrom} 
                    dateSent={info.item.dateSent}
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

export default tokenList