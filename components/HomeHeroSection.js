import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import {
	MarkaziText_500Medium,
	MarkaziText_400Regular,
} from '@expo-google-fonts/markazi-text';
import { Karla_500Medium } from '@expo-google-fonts/karla';

import { useFonts } from 'expo-font';


import SearchBar from './SearchBar';

const HomeHeroSection = () => {
	const [fontsLoaded] = useFonts({
		MarkaziText_500Medium,
		MarkaziText_400Regular,
		Karla_500Medium,
	});
	if (!fontsLoaded) return null;

	return (
		<View style={styles.container}>
			{/* box 1 */}
			<View style={{ flex: 0.4 }}>
				<Text style={styles.displayText}>Little lemon</Text>
				<Text style={styles.subTitle}>Chicago</Text>
			</View>
			{/* box 2 */}
			<View style={[styles.innerContainer, { flex: 0.4 }]}>
				<View style={styles.subContainerText}>
					<Text style={styles.leadText}>
						We are a family owned Mediterranean restaurant, focused
						on traditional recipes served with a modern twist.
					</Text>
				</View>
			</View>
			{/* box 3 */}
			<View style={[styles.searchBarContainer]}>
				<SearchBar />
			</View>
			<View style={styles.subContainerImg}>
				{/* image */}
				<Image
					style={styles.heroImg}
					source={require('../assets/images/Hero image.png')}
					accessible
					accessibilityLabel="Hero image"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#495E57',
		paddingLeft: 10,
		paddingVertical: 5,
		paddingRight: 10,
	},
	displayText: {
		fontFamily: 'MarkaziText_500Medium',
		fontSize: 50,
		color: '#F4CE14',
	},
	subTitle: {
		fontFamily: 'MarkaziText_400Regular',
		fontSize: 30,
		color: '#EDEFEE',
		marginTop: -20,
	},
	leadText: {
		fontFamily: 'Karla_500Medium',
		fontSize: 16,
		color: '#000',
	},
	innerContainer: {
		flexDirection: 'row',
		gap: 5,
	},
	heroImg: {
		width: 140,
		height: 160,
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
		position: 'absolute',
		top: 60,
		right: 4,
	},
	searchBarContainer: {
		marginTop: 5,
		flex: 0.2,
	},
});

export default HomeHeroSection;
