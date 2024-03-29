import React from 'react';
import {View, StyleSheet , Text , ScrollView} from 'react-native';
import HeaderHome from '../components/HeaderHome';
import HomeHeroSection from '../components/HomeHeroSection';
import useGetProfilInfo  from '../app/customHooks/useGetProfilInfo';
import CategoriesSection from '../components/CategoriesSection';
const HomeScreen = ({navigation}) => {
    useGetProfilInfo();
    return (
        <>
        <HeaderHome navigation={navigation}/>
        <ScrollView>
            <HomeHeroSection />
            <CategoriesSection />
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
