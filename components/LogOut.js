import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Karla_500Medium, useFonts } from '@expo-google-fonts/karla';
import { useContext } from 'react';
import { MyLoginContext } from '../app/context/MyContexts';
import { storeObjectData } from '../app/context/asyncStorageData';

const LogOut = () => {
	console.log("log out component")
	const { setIsLoged } = useContext(MyLoginContext);
	const [fontsLoaded] = useFonts({
		Karla_500Medium,
	});
	if (!fontsLoaded) null;

	const handleLogout = async () => {
		console.log('Logout pressed');
		setIsLoged(false);
		await storeObjectData('isLoged', 'false');
		console.log(
			'after logout isLoged value = false , is stored in asyncStorage'
		);
	};

	return (
		<View style={styles.container}>
			<Pressable style={styles.button} onPress={handleLogout}>
				<Text style={styles.buttonText}>Log Out</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	button: {
		padding: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F4CE14',
		width: 300,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Karla_500Medium',
	},
});

export default React.memo(LogOut);
