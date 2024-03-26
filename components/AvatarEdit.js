import React from 'react';
import { View, StyleSheet, Button, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useState , useEffect } from 'react';
import { getFirstName } from '../app/context/secureStore';

import UserAvatar from 'react-native-user-avatar';
import * as ImagePicker from 'expo-image-picker';

const AvatarEdit = ({image , setImage}) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		console.log(result);
	
		if (!result.canceled) {
		  setImage(result.assets[0].uri);
		}
	  };
	
	const handleChange = async () => {
		await pickImage();
		console.log('changed');
	};
	const handleRemove = () => {
		if(!image){
			return
		}
		console.log('removed');
		setImage(null);
	};

    const [firstName , setFirstName] = useState('')
	useEffect(() => {
		const fetchFirstName = async () => {
			const name = await getFirstName();
			if(name){
				setFirstName(name)
			}
		}
		fetchFirstName()
	} , [])


 

	return (
		<View style={styles.container}>
		    {!image ? (!firstName ? <Avatar.Image
				size={40}
				source={require('../assets/images/avatarIcon.png')}
				backgroundColor="transparent"
			/> : <UserAvatar size={40} name={firstName} />) : (
				<Avatar.Image size={40} source={{ uri: image }} />
				
			)
			}

			<Button
				title="Change"
				color={'#495E57'}
				onPress={handleChange}
				accessibilityLabel="Change avatar image"
			/>
			<Button
				title="Remove"
				color={'red'}
				onPress={handleRemove}
				accessibilityLabel="Remove avatar image"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 20,
		padding: 10,
		marginVertical: 10,
	},
});

export default AvatarEdit;
