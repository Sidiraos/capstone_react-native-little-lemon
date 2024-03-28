import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BackIcon } from '../utils/Icons';
import { useNavigation } from '@react-navigation/native';
import { showAlert } from '../utils/alert';
import { getObjectData } from '../app/context/asyncStorageData';
import { useDispatch } from 'react-redux';
import { updateStateFromAsync } from '../app/redux/slices/profilInfoSlice';
const BackButton = ({ noChanged }) => {

	const dispatch = useDispatch();
	const navigation = useNavigation();
	const handleBackButton = () => {
		const handleReturn = async () => {
			try{
				const profilInfo = await getObjectData('profilInfo');
                if(profilInfo){
					dispatch(updateStateFromAsync(profilInfo));
                }
                Alert.alert('Changes discarded');
                console.log("changes no saved")
				console.log('going back');
				navigation.goBack();
                
            } catch (error) {
                console.log('error', error.message);
                Alert.alert('Error Discarding Changes' , error.message);
            } 
			
		}
		if (!noChanged) {
			showAlert(
				'Discard changes',
				'unsaved changes will be lost if you return, are you sure?',
				handleReturn
			);
		} else {
			navigation.goBack();
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
