import React, { useEffect } from 'react';
import { Text,Alert,Button,BackHandler,NativeModules } from 'react-native'
import * as e from './dashboardComponents'
import { MainView } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Dashboard({navigation}){
    const rmToken = async()=>{
        return await AsyncStorage.clear()
    }
    const getToken = async()=>{
    rmToken()
    NativeModules.DevSettings.reload()
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', (e)=>{
            return true;
        });
}, []);
return(
    <MainView>
        <Button onPress={getToken} title='Token?'/>
    <Text>Dashboard</Text>
    </MainView>
);
}