import React from 'react';
import { NativeModules } from 'react-native'
import * as e from './accountComponents'
import { MainView } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function MyAccout({ navigation }){
    return(
        <MainView>
            <e.BasicText>My Account</e.BasicText>
        </MainView>
    )
}