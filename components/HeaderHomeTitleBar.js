import React from 'react';
import {View, StyleSheet , Text} from 'react-native';

const HeaderHomeTitleBar = ({headerTitle}) => {
    console.log("Header home title bar")
    return (
        <View style={[styles.container, styles.shadowProp]}>
            <Text style={styles.barText}>{headerTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F3F4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    barText : {
        fontFamily: 'Karla_500Medium',
		fontSize: 20,
		textAlign: 'center',
    }
})

export default React.memo(HeaderHomeTitleBar);
