import React from 'react';
import { NativeModules } from 'react-native'
import * as e from './accountComponents'
import { MainView, BasicText, AddTouchable } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function MyAccout({ navigation }){
    return(
        <MainView>
            <BasicText>My Account</BasicText>
        </MainView>
    )
}