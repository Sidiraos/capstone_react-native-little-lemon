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
import { onSignUp } from '../app/context/secureStore';
import { useContext } from 'react';
import { MyLoginContext } from '../app/context/MyContexts';
const SignUpForm = ({ navigation }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [isDisabled, setIsDisabled] = React.useState(true);
	const [isFocused, setIsFocused] = React.useState(false);
	const [errMsg, setErrMsg] = React.useState('');

	React.useEffect(() => {
		// console.log("isdisabled now" , isDisabled)
		// console.log("isFocused now" , isFocused)
		if (
			validateEmail(email) &&
			validatePassword(password) &&
			password === confirmPassword
		) {
			setIsDisabled(false);
			setIsFocused(false);
		} else {
			setIsDisabled(true);
		}
	}, [email, password, confirmPassword]);

	const { isLoged, setIsLoged } = useContext(MyLoginContext);

	let [fontsLoaded] = useFonts({
		Karla_500Medium,
	});

	if (!fontsLoaded) {
		return null;
	}

	const onPressSignUp = async () => {
		console.log('signed up');
		const result = await onSignUp(email, password);
		console.log('can signup', result);
		if (result) {
			setIsLoged(true);
			setEmail('');
			setPassword('');
			setConfirmPassword('');
			setIsDisabled(true);
			setErrMsg('');
		} else {
			console.log('failed to signup');
			setErrMsg('failed to signup');
			setIsLoged(false);
		}
	};

	const handleFocus = () => {
		setIsFocused(!isFocused);
		console.log('onFocus , focus is', isFocused);
	};
	const handleBlur = () => {
		setIsFocused(false);
		console.log('onBlur , focus is', isFocused);
	};

	// console.log('focus now is ', isFocused);

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				enabled={true}
			>
				{isFocused && !errMsg ? (
					<Text style={styles.warningText}>
						Please enter correct email and Password more than 8
						characters
					</Text>
				) : (
					<Text style={styles.errMsg}>{errMsg}</Text>
				)}

				<View style={styles.innerContainer}>
					<TextInput
						label="Email"
						value={email}
						onChangeText={(text) => setEmail(text)}
						mode="outlined"
						style={styles.input}
						placeholder="username@gmail.com"
						textColor="#333333"
						activeOutlineColor={'rgba(51, 51, 51, 1)'}
						outlineColor="rgba(51, 51, 51, 0.3)"
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
						outlineColor="rgba(51, 51, 51, 0.3)"
						secureTextEntry={true}
						clearTextOnFocus
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<TextInput
						label="Confirm Password"
						value={confirmPassword}
						onChangeText={(confirmPassword) =>
							setConfirmPassword(confirmPassword)
						}
						mode="outlined"
						style={styles.input}
						placeholder="**********"
						textColor="#333333"
						activeOutlineColor={'rgba(51, 51, 51, 1)'}
						outlineColor="rgba(51, 51, 51, 0.3)"
						secureTextEntry={true}
						clearTextOnFocus
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<TouchableOpacity
						style={[
							styles.button,
							{
								backgroundColor: isDisabled
									? '#F2F3F4'
									: '#F4CE14',
							},
						]}
						onPress={onPressSignUp}
						disabled={isDisabled}
					>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingBottom: 20,
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

export default SignUpForm;
