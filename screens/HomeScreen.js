import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import HeaderHome from '../components/HeaderHome';
import HomeHeroSection from '../components/HomeHeroSection';
import useGetProfilInfo from '../app/customHooks/useGetProfilInfo';
import CategoriesSection from '../components/CategoriesSection';
import FoodMenu from '../components/FoodMenu';

const HomeScreen = ({ navigation }) => {
	useGetProfilInfo();
	// clearDb()

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container.mainScreen}
		>
			<ScrollView
				stickyHeaderIndices={[0]}
				keyboardDismissMode="on-drag"
				style={styles.container.ScrollViewScreen}
			>
				<HeaderHome navigation={navigation} />
				<HomeHeroSection />
				<CategoriesSection />
			</ScrollView>
			<View style={styles.container.flatListScreen}>
				<FoodMenu />
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		mainScreen: {
			flex: 1,
		},
		ScrollViewScreen: {
			flex: 0.6,
			backgroundColor: '#fff',
		},
		flatListScreen: {
			flex: 0.4,
		},
	},
});

export default HomeScreen;
