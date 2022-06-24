import React from 'react';
import { NativeModules } from 'react-native'
import * as e from './bookmarksComponents'
import { MainView, BasicText, AddTouchable } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Bookmarks({ navigation }){
    return(
        <MainView>
            <BasicText>Bookmarks</BasicText>
        </MainView>
    )
}