import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import { ActivityIndicator} from 'react-native-paper'

const SplashScreen = () => {
    return (
        <View style={styles.container} >
            <View style={styles.innerContainer}>
                <ImageBackground resizeMode='contain' source={require('../assets/images/little-lemon-logo.png')} style={styles.logo}/>
            <ActivityIndicator animating={true} color={"#F4CE14"} size={'large'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'rgba(51, 51, 51, 1)',
        alignItems : 'center',
        justifyContent : 'center',
    },
    logo : {
        width : "100%",
        height : "80%",
    },
    innerContainer : {
        width : "80%",
        height : "100%",
        alignItems : 'center',
        justifyContent : 'center',
    }

})

export default SplashScreen;
