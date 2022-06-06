import React from 'react';
import { NativeModules } from 'react-native'
import * as e from './menuComponents'
import { MainView } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Menu({ navigation }){
 const rmToken = async()=>{
        await AsyncStorage.clear() 
        NativeModules.DevSettings.reload()
    } 
    return(
        <MainView>
        <e.Signout onPress={rmToken}>
            <e.SignoutText>Log Out</e.SignoutText>
        </e.Signout>
        </MainView>
    )
}