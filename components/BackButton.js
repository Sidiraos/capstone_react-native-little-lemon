import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BackIcon } from '../utils/Icons';
import { useNavigation } from '@react-navigation/native';
import { showAlert } from '../utils/alert';
const BackButton = ({ noChanged }) => {
	const navigation = useNavigation();
	const handleBackButton = () => {
		const handleReturn = () => {
			// navigation.navigate("Home");
			console.log('going back');
			
		}
		if (!noChanged) {
			showAlert(
				'Discard changes',
				'unsaved changes will be lost if you return, are you sure?',
				handleReturn
			);
		} else {
			// navigation.navigate("Home");
			console.log("going back")
		}
	};
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
