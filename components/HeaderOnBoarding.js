import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const HeaderOnBoarding = () => {
	return (
		<View style={[styles.container, styles.shadowProp]}>
			<Image
				style={styles.logo}
				source={require('../assets/images/Logo.png')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F2F3F4',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(51, 51, 51, 0.3)',
	},
	logo: {
		width: 200,
		height: 100,
		resizeMode: 'contain',
	},
	shadowProp: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
});

export default HeaderOnBoarding;
