import React from 'react';
import {StyleSheet, Image } from 'react-native';

const Logo = ({ widthLogo, heightLogo}) => {
	return (
		<Image
			source={require('../assets/images/Logo.png')}
			style={{ width:  widthLogo , height: heightLogo  }}
			resizeMode="contain"
		/>
	);
};

const styles = StyleSheet.create({});

export default Logo;
