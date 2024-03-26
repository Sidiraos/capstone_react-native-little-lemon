import { useState , useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen.js';
import Onboarding from './screens/Onboarding.js';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

import { MyLoginContext } from './app/context/MyContexts.js';
import { storeData , getData } from './app/context/asyncStorageData.js';

import { Karla_800ExtraBold, Karla_500Medium , useFonts } from '@expo-google-fonts/karla';
import { clearAsyncData } from './app/context/asyncStorageData.js';


export default function App() {
	const [isLoged, setIsLoged] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// console.log(isLoged)
	
	useEffect(() => {
		const fetchData =  async ()=>{
			// await clearAsyncData();
			console.log("we fetching data asyncStorage")
			const data = await getData('isLoged');
			if(!data){
				console.log("data not found in asyncStorage , so we store initialState of isLogedValue : " , isLoged)
				await storeData('isLoged' , isLoged);
	
			} else {
				console.log("data found in asyncStorage , so we set the new state of isLogedValue : " , data)
				console.log( "boolean ",data === "true")
				const bol = data === "true"
				setIsLoged(bol);
				console.log("now isLoged state is : " , isLoged)
			}
		}

		fetchData();

		const intervalID = setTimeout(() => {
			setIsLoading(false)
		} , 1000)

		return () => {
			clearTimeout(intervalID)
		}

	}, [])

	// useEffect(() => {
	// 	console.log("on the mounting app , isLoged state is" , isLoged)
	// 	const storeIsLogedData = async () => {
	// 		console.log("we store isLoged state in async if it's changed , so we have value is : " , isLoged)
	// 		await storeData('isLoged' , isLoged);
	// 	}
	// 	storeIsLogedData()
	// }, [isLoged])
	
	const Stack = createNativeStackNavigator();

	let [fontsLoaded] = useFonts({
		Karla_800ExtraBold,
		Karla_500Medium
	});

	if (!fontsLoaded) {
		return null;
	}
	
	if(isLoading){
		return <SplashScreen />
	}

	return (
		<MyLoginContext.Provider value={{ isLoged, setIsLoged }}>
			<NavigationContainer>
				<PaperProvider>
					<StatusBar backgroundColor={'rgba(1, 1, 1, 0.8 )'} />
					<SafeAreaView style={styles.container}>
						<Stack.Navigator>
							{!isLoged ? (
								<Stack.Screen
									name="OnBoarding"
									component={Onboarding}
									options={{ headerShown: false }}
								/>
							) : (
								<>
								{/* <Stack.Screen
									name="Home"
									component={HomeScreen}
									options={{ headerShown: false }}
								/> */}
								<Stack.Screen
									name="Personnal information"
									component={ProfileScreen}
									options={{
										headerShown: false,
									  }}
								/>
								
								</>
							)}
						</Stack.Navigator>
					</SafeAreaView>
				</PaperProvider>
			</NavigationContainer>
		</MyLoginContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
