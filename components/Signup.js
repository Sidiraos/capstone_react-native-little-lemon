import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { Karla_500Medium, useFonts } from '@expo-google-fonts/karla';
import { FacebookIcon, GoogleIcon, TwitterIcon } from '../utils/Icons';
import SignUpForm from './SignUpForm';

const Signup = ({ navigation }) => {
	let [fontsLoaded] = useFonts({
		Karla_500Medium,
	});

	if (!fontsLoaded) {
		return null;
	}
	return (
		<ScrollView style={styles.container} keyboardDismissMode="on-drag">
			<View style={styles.innnerContainer}>
				<Text style={styles.headtitle}>
					🍋 Join the zestful community of Little Lemon today for a
					refreshing boost in your daily routine! 🚀 Sign up now!
				</Text>
				<Text style={styles.headtitle}>👇</Text>
			</View>

			<View style={styles.innnerContainer}>
				<Text style={styles.headtitle}>Sign up with :</Text>
			</View>

			<View style={styles.iconBlock}>
				<FacebookIcon />
				<GoogleIcon />
				<TwitterIcon />
			</View>

			<View style={styles.innnerContainer}>
				<Text style={styles.headtitle}>Or Sign up with :</Text>
			</View>

			<View style={[styles.innnerContainer, { paddingBottom: 40 }]}>
				<SignUpForm navigation={navigation} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 20,
		flex: 1,
	},
	headtitle: {
		fontFamily: 'Karla_500Medium',
		fontSize: 20,
		textAlign: 'center',
		marginVertical: 10,
	},
	iconBlock: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginVertical: 20,
		flex: 1,
	},
	innnerContainer: {
		flex: 1,
	},
});

export default Signup;
