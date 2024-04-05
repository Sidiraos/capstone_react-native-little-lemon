import React from 'react';
import { View, StyleSheet , Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import Logo from './Logo';
import UserAvatar from 'react-native-user-avatar';
import { getFirstName } from '../app/context/secureStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';


const HeaderHome = ({ btnComponent , navigation }) => {
	const [firstName, setFirstName] = useState('');
	const image = useSelector((state) => state.profilInfo.image);
	// console.log("image in header home", image);
	console.log('header home');
	const route = useRoute();
	const screenName = route.name;
	useEffect(() => {
		const fetchFirstName = async () => {
			const name = await getFirstName();
			if (name) {
				setFirstName(name);
			}
		};
		fetchFirstName();
	}, []);

	return (
		<View style={styles.container}>
			{btnComponent}
			<Logo widthLogo={200} heightLogo={100} />
			<Pressable onPress={() => screenName === 'Home' && navigation.navigate('Personnal information')}>
			{!image ? (
				!firstName ? (
					<Avatar.Image
						size={40}
						source={require('../assets/images/avatarIcon.png')}
						backgroundColor="transparent"
					/>
				) : (
					<UserAvatar size={40} name={firstName} />
				)
			) : (
				<Avatar.Image size={40} source={{ uri: image }} />
			)}
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		backgroundColor: '#F2F3F4',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(51, 51, 51, 0.3)',
	},
});

export default React.memo(HeaderHome);
