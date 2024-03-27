import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity , Alert , ActivityIndicator } from 'react-native';
import { Karla_500Medium, useFonts } from '@expo-google-fonts/karla';
import { showAlert } from '../utils/alert';
import { getObjectData , storeObjectData } from '../app/context/asyncStorageData';
import {useSelector , shallowEqual , useDispatch} from 'react-redux';
import { updateStateFromAsync } from '../app/redux/slices/profilInfoSlice';
const SaveDiscard = () => {
	console.log('saved discard component');
    const profilInfoState = useSelector(state => state.profilInfo , shallowEqual);
    const dispatch = useDispatch();
	const [fontsLoaded] = useFonts({
		Karla_500Medium,
	});
	if (!fontsLoaded) null;

	const handleSave = () => {
		console.log('handle save');
        const saveToStorage = async () => {
            console.log('saving to storage');
            try{
                await storeObjectData('profilInfo', profilInfoState);
                Alert.alert('Changes Saved');
                console.log("data saved")
                
            } catch (error) {
                console.log('error saving data', error.message);
                Alert.alert('Error Saving Changes' , error.message);
            } 


        }
		showAlert(
			'Save Changes',
			'Are you sure you want to save changes ?',
			saveToStorage
		);
	};

	const handleDiscard = () => {
		console.log('handle discard');
        const discardChanges = async () => {
            console.log('discarding changes');
            try{
                const profilInfo = await getObjectData('profilInfo');
                if(profilInfo){
                    dispatch(updateStateFromAsync(profilInfo));
                }
                Alert.alert('Changes discarded');
                console.log("changes no saved")
                
            } catch (error) {
                console.log('error', error.message);
                Alert.alert('Error Discarding Changes' , error.message);
            } 
        }
        showAlert(
			'Discard Changes',
			'Are you sure you want to discard changes ?',
			discardChanges
		);
	};
	return (
		<View style={styles.buttonGroup}>
			<TouchableOpacity
				style={[styles.button, styles.discardButton]}
				onPress={handleDiscard}
			>
				<Text style={[styles.textButton, styles.discardText]}>
					Discard changes
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, styles.saveButton]}
				onPress={handleSave}
			>
				<Text style={[styles.textButton, styles.saveText]}>
					Save changes
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginVertical: 40,
		gap: 10,
		paddingHorizontal: 20,
	},
	button: {
		padding: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 300,
		borderRadius: 9,
	},
	textButton: {
		fontFamily: 'Karla_500Medium',
	},
	discardButton: {
		borderWidth: 1,
		backgroundColor: 'transparent',
		borderColor: '#495E57',
	},
	discardText: {
		color: 'rgba(51, 51, 51, 0.6)',
	},
	saveButton: {
		backgroundColor: '#495E57',
	},
	saveText: {
		color: '#fff',
	},
});

export default React.memo(SaveDiscard);
