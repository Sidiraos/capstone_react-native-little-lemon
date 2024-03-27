import React from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Logo from './Logo';
import BackButton from './BackButton';
import UserAvatar from 'react-native-user-avatar';
import { getFirstName } from '../app/context/secureStore';
import { useEffect , useState} from 'react';
import {useSelector} from 'react-redux'

const HeaderHome = ({noChanged}) => {
	const [firstName , setFirstName] = useState('');
	const image = useSelector(state => state.profilInfo.image)
	console.log("header home")
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
			<BackButton noChanged={noChanged} />
			<Logo widthLogo={200} heightLogo={100} />
			{!image ? (!firstName ? <Avatar.Image
				size={40}
				source={require('../assets/images/avatarIcon.png')}
				backgroundColor="transparent"
			/> : <UserAvatar size={40} name={firstName} />) : (
				<Avatar.Image size={40} source={{ uri: image }} />
			)}
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
