import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeroSection from './HeroSection';
import LoginForm from './LoginForm';

const Login = ({ navigation }) => {
	return (
		<ScrollView keyboardDismissMode="on-drag" style={styles.container}>
			<HeroSection />
			<LoginForm navigation={navigation} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default Login;
