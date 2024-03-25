import React from 'react';
import {View, StyleSheet , Text} from 'react-native';
import { MarkaziText_400Regular , MarkaziText_500Medium  , useFonts} from '@expo-google-fonts/markazi-text'

const HeroSection = () => {
    let [fontsLoaded] = useFonts({
        MarkaziText_500Medium,
        MarkaziText_400Regular
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return (
        <View style={styles.container}>
            <View style={{flexDirection : 'row' , alignItems : 'center'}}>
                <Text style={styles.headtitle}>Welcome </Text>
                <Text style={styles.subtitle}>👋</Text>
            </View>
            <Text style={styles.subtitle}>Let's order some food</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        marginTop : 0
    },
    headtitle : {
    fontFamily : 'MarkaziText_500Medium',
    fontSize : 60,
    },
    subtitle : {
        fontFamily : 'MarkaziText_400Regular',
        fontSize : 40
    }
})

export default HeroSection;
