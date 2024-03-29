import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Karla_800ExtraBold , useFonts } from '@expo-google-fonts/karla';
import CategoriesSectionTitle from './CategoriesSectionTitle';
import ListOfCategories from './ListOfCategories';
const CategoriesSection = () => {
    const [fontsLoaded] = useFonts({
        Karla_800ExtraBold
    })
    if(!fontsLoaded) return null

	return (
		<View style={styles.container}>
            <CategoriesSectionTitle />
            <ListOfCategories />
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(51, 51, 51, 0.6)',
    }
});

export default CategoriesSection;
