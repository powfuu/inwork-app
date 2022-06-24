import React from 'react';
import { NativeModules } from 'react-native'
import * as e from './searchmatchComponents'
import { MainView, BasicText, AddTouchable } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function SearchMatchComponents({ navigation }){
    return(
        <MainView>
            <BasicText>Search Match Components</BasicText>
        </MainView>
    )
}