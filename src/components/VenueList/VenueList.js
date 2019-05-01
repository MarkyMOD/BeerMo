import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import VenueListItem from '../VenueListItem/VenueListItem'

const venueList = props => {

    
    return (
        <FlatList 
            style={styles.listContainer} 
            data={props.venues}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(info) => (
                <VenueListItem 
                    venueName={info.item.venueName} 
                    venueStreetAddress={info.item.venueStreetAddress}
                    venueCity={info.item.venueCity}
                    venueZipCode={info.item.venueZipCode}
                    onItemPressed={() => props.onVenueSelected(info.item.venueName)}
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

export default venueList