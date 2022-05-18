import React, { useEffect } from 'react';
import { BackHandler,NativeModules } from 'react-native'
import * as e from './dashboardComponents'
import { MainViewApp } from '../../defaultStyles';
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
    <MainViewApp>

    </MainViewApp>
);
}