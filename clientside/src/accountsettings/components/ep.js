import React from 'react';
import { NativeModules } from 'react-native'
import * as e from '../accountsettingsComponents'
import { MainView, BasicText, AddTouchable } from '../../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function AccountSettings({ navigation }){
    return(
        <MainView>
            <BasicText>Experience Projects</BasicText>
        </MainView>
    )
}