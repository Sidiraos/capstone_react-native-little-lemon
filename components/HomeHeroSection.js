import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {
	MarkaziText_500Medium,
	MarkaziText_400Regular,
	useFonts,
} from '@expo-google-fonts/markazi-text';
import { Karla_500Medium } from '@expo-google-fonts/karla';

import SearchBar from './SearchBar';



const HomeHeroSection = () => {
	const [fontsLoaded] = useFonts({
		MarkaziText_500Medium,
		MarkaziText_400Regular,
        Karla_500Medium
	});
	if (!fontsLoaded) {null};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.displayText}>Little lemon</Text>
				<Text style={styles.subTitle}>Chicago</Text>
			</View>
			<View style={styles.innerContainer}>
				<View style={styles.subContainerText}>
					<Text style={styles.leadText}>
						We are a family owned Mediterranean restaurant, focused
						on traditional recipes served with a modern twist.
					</Text>
				</View>
				<View style={styles.subContainerImg}>
					{/* image */}
					<Image
						style={styles.heroImg}
						source={require('../assets/images/Hero image.png')}
                        accessible
                        accessibilityLabel='Hero image'
     
					/>
				</View>
			</View>
            <SearchBar />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#495E57',
		paddingLeft: 20,
		paddingVertical: 20,
		paddingRight: 10,
	},
	displayText: {
		fontFamily: 'MarkaziText_500Medium',
		fontSize: 60,
		color: '#F4CE14',
        flex: 1
	},
	subTitle: {
		fontFamily: 'MarkaziText_400Regular',
		fontSize: 40,
		color: '#EDEFEE',
        flex: 1
	},
	leadText: {
		fontFamily: 'Karla_500Medium',
		fontSize: 16,
		color: '#000',
	},
	innerContainer: {
		flexDirection: 'row',
		flex: 1,
		gap: 5,
	},
	heroImg: {
		width: 140,
		height: 171,
		resizeMode: 'cover',
		borderRadius: 10,
	},
	subContainerText: {
		flex: 0.6,
	},
	subContainerImg: {
		flex: 0.4,
		overflow: 'hidden',
		borderRadius: 10,
	},
});

export default HomeHeroSection;
