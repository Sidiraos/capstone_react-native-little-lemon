import React from 'react';
import {View, StyleSheet , Text , Image} from 'react-native';
import { Karla_800ExtraBold , useFonts } from '@expo-google-fonts/karla';


const CategoriesSectionTitle = () => {
    const [fontsLoaded] = useFonts({
        Karla_800ExtraBold
    })
    if(!fontsLoaded) return null

    return (
        <View style={styles.innerContainer}>
				<Text style={styles.sectionTitle}>Order for Delivery!</Text>
				<Image
					source={require('../assets/images/Delivery van.png')}
					style={styles.image}
                    resizeMode="contain"
				/>
			</View>
    );
}

const styles = StyleSheet.create({
    innerContainer : {
        flex: 1,
        flexDirection : 'row',
        gap : 10,
        alignItems : 'center',
    },
    sectionTitle : {
        fontFamily : 'Karla_800ExtraBold',
        fontSize : 20,
        textTransform : 'uppercase',
        color : '#333',
    },
    image : {
        width : 56,
        height : 42
    }
})

export default CategoriesSectionTitle;
