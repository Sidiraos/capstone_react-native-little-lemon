import React from 'react';
import {View, StyleSheet , Text , ScrollView} from 'react-native';
import HeaderHome from '../components/HeaderHome';
import HomeHeroSection from '../components/HomeHeroSection';
import useGetProfilInfo  from '../app/customHooks/useGetProfilInfo';
const HomeScreen = ({navigation}) => {
    useGetProfilInfo();
    return (
        <>
        <HeaderHome navigation={navigation}/>
        <ScrollView>
            <HomeHeroSection />
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
