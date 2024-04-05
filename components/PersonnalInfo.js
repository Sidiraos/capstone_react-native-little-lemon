import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getLoginInfo } from '../app/context/secureStore';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';

const PersonnalInfo = () => {
	const [loginInfo, setLoginInfo] = useState('');
	console.log("personnal info component")
	useEffect(() => {
		const fetchLoginInfo = async () => {
			const loginInfo = await getLoginInfo();
		
			if (loginInfo) {
				setLoginInfo(loginInfo);
			}
		};
		fetchLoginInfo();
	}, []);
	// console.log('info profilForm are', loginInfo);
	return (
		<View style={styles.container}>
			<TextInput
						label="Email"
						value={loginInfo.email}
						mode="outlined"
						style={styles.input}
						placeholder="username@gmail.com"
						textColor="#333333"
						activeOutlineColor={'rgba(51, 51, 51, 1)'}
						outlineColor="rgba(51, 51, 51, 0.3)"
						readOnly
					/>
	
					<TextInput
						label="firstName"
						value={loginInfo.firstName}
						mode="outlined"
						style={styles.input}
						textColor="#333333"
						activeOutlineColor={'rgba(51, 51, 51, 1)'}
						outlineColor="rgba(51, 51, 51, 0.3)"
						readOnly
				
					/>
					<TextInput
						label="lastName"
						value={loginInfo.lastName}
						mode="outlined"
						style={styles.input}
						textColor="#333333"
						activeOutlineColor={'rgba(51, 51, 51, 1)'}
						outlineColor="rgba(51, 51, 51, 0.3)"
						readOnly
						
					/>
				
		</View>
	);
};

const styles = StyleSheet.create({
	container : {
		flex : 1,
		padding : 10,
		gap : 20,
		marginVertical : 10,
	}
});

export default React.memo(PersonnalInfo);
