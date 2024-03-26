import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BackIcon } from '../utils/Icons';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
	const navigation = useNavigation();
	const handleBackButton = () => {
		console.log("going back");
		// navigation.navigate("Home");
	}
	return (
		<TouchableOpacity style={styles.iconButton} onPress={handleBackButton}>
			<BackIcon width={25} height={30} color={'#fff'} strokeWidth={15} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	iconButton: {
		padding: 10,
		backgroundColor: '#495E57',
		borderRadius: 50,
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default BackButton;
