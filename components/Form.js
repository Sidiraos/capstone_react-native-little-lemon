import React from 'react';
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Karla_500Medium, useFonts } from '@expo-google-fonts/karla';
import { validateEmail, validatePassword } from '../utils/validate';
import { onLogin } from '../app/context/secureStore';
import { useContext } from 'react';
import { MyLoginContext } from '../app/context/MyContexts';
const Form = ({ navigation }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isDisabled, setIsDisabled] = React.useState(true);
	const [isFocused, setIsFocused] = React.useState(false);
	const { isLoged, setIsLoged } = useContext(MyLoginContext);
	const [errMsg, setErrMsg] = React.useState('');

	React.useEffect(() => {
		// console.log("useEffect validation" , isDisabled)
		if (validateEmail(email) && validatePassword(password)) {
			setIsDisabled(false);
			setIsFocused(false);
		} else {
			setIsDisabled(true);
		}
	}, [email, password]);

	let [fontsLoaded] = useFonts({
		Karla_500Medium,
	});

	if (!fontsLoaded) {
		return null;
	}

	const onPressLogin = async () => {
		const result = await onLogin(email, password);
		console.log('can login ? ', result);
		if (result) {
			setIsLoged(true);
			console.log('isLogedState : ', isLoged);
			console.log('login success');
			setErrMsg('');
			setEmail('');
			setPassword('');
			setIsDisabled(true);
		} else {
			setIsLoged(false);
			console.log('failed to login , isLogedValue : ', isLoged);
			setErrMsg(
				'Email or password is incorrect , if you are not registered , please register first'
			);
		}
	};

	const onPressSignUp = () => {
		navigation.navigate('Signup');
		setErrMsg('');
		setEmail('');
		setPassword('');
		setIsDisabled(true);
	};

	const handleFocus = () => {
		setIsFocused(!isFocused);
		console.log('onFocus , focus is', isFocused);
		setErrMsg('');
	};
	const handleBlur = () => {
		setIsFocused(false);
		console.log('onBlur , focus is', isFocused);
	};

	// console.log('focus now is ', isFocused);

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			enabled={true}
		>
			<View style={styles.innerContainer}>
				{isFocused && !isLoged && !errMsg ? (
					<Text style={styles.warningText}>
						Please enter correct email and Password more than 8
						characters
					</Text>
				) : (
					<Text style={styles.errMsg}>{errMsg}</Text>
				)}

				<TextInput
					label="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					mode="outlined"
					style={styles.input}
					placeholder="username@gmail.com"
					textColor="#333333"
					activeOutlineColor={'rgba(51, 51, 51, 1)'}
					outlineColor={
						!isLoged && !isDisabled && errMsg
							? 'red'
							: 'rgba(51, 51, 51, 0.3)'
					}
					keyboardType="email-address"
					inputMode="email"
					clearTextOnFocus
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<TextInput
					label="Password"
					value={password}
					onChangeText={(password) => setPassword(password)}
					mode="outlined"
					style={styles.input}
					placeholder="**********"
					textColor="#333333"
					activeOutlineColor={'rgba(51, 51, 51, 1)'}
					outlineColor={
						!isLoged && !isDisabled && errMsg
							? 'red'
							: 'rgba(51, 51, 51, 0.3)'
					}
					secureTextEntry
					clearTextOnFocus
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<TouchableOpacity
					style={[
						styles.button,
						{ backgroundColor: isDisabled ? '#F2F3F4' : '#F4CE14' },
					]}
					onPress={onPressLogin}
					disabled={isDisabled}
				>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={onPressSignUp}>
					<Text style={styles.callToSubscribeText}>
						Don't have an account ?
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	innerContainer: {
		alignItems: 'center',
		marginTop: 20,
	},
	input: {
		backgroundColor: '#F2F3F4',
		width: 300,
	},
	button: {
		width: 300,
		borderRadius: 10,
		alignItems: 'center',
		padding: 10,
		marginTop: 20,
	},
	buttonText: {
		color: '#333333',
		fontFamily: 'Karla_500Medium',
		fontSize: 20,
	},
	callToSubscribeText: {
		fontFamily: 'Karla_500Medium',
		fontSize: 20,
		marginTop: 20,
		color: '#107AB0',
		textDecorationLine: 'underline',
	},
	warningText: {
		color: 'green',
		marginVertical: 10,
		fontFamily: 'Karla_500Medium',
		paddingHorizontal: 10,
	},
	errMsg: {
		color: '#cc3300',
		marginVertical: 10,
		fontFamily: 'Karla_500Medium',
		paddingHorizontal: 10,
	},
});

export default Form;
