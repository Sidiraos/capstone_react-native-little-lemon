import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderOnBoarding from '../components/HeaderOnBoarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Karla_800ExtraBold, useFonts } from '@expo-google-fonts/karla';

import Login from '../components/Login';
import Signup from '../components/Signup';
const Onboarding = ({ navigation }) => {
	let [fontsLoaded] = useFonts({
		Karla_800ExtraBold,
	});

	if (!fontsLoaded) {
		return null;
	}

	const Stack = createNativeStackNavigator();
	return (
		<View style={styles.container}>
			<HeaderOnBoarding />
			<Stack.Navigator
				screenOptions={{
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: '#F2F3F4' },
					headerTitleStyle: { fontFamily: 'Karla_800ExtraBold' },
				}}
			>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Signup" component={Signup} />
			</Stack.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default Onboarding;
