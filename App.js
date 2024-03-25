import { useState , useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Onboarding from './screens/Onboarding.js';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import { MyLoginContext } from './app/context/MyContexts.js';
import { storeData , getData } from './app/context/asyncStorageData.js';

export default function App() {
	const [isLoged, setIsLoged] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		const fetchData =  async ()=>{
			const data = await getData('isLoged');
			console.log("fetching data asyncStorage")
			if(!data){
				await storeData('isLoged' , isLoged);
	
			} else {
				setIsLoged(Boolean(data));
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

	useEffect(() => {
		console.log("isLoged" , isLoged)
		const storeIsLogedData = async () => {
			await storeData('isLoged' , isLoged);
		}
		storeIsLogedData()
	}, [isLoged])
	
	const Stack = createNativeStackNavigator();
	
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
								<Stack.Screen
									name="Home"
									component={HomeScreen}
									options={{ headerShown: false }}
								/>
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
