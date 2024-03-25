import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HeroSection from './HeroSection';
import Form from './Form';

const Login = ({navigation}) => {
    return (
        <ScrollView keyboardDismissMode="on-drag" style={styles.container}>
            <HeroSection />
            <Form navigation={navigation}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default Login;
