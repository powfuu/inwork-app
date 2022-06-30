import React, { useEffect, useState } from 'react';
import { NativeModules, BackHandler, Alert } from 'react-native'
import * as e from './accountComponents'
import { MainView } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import { HOST } from '@env'
import axios from 'axios'
import non1 from '../../resources/projects.png'
import non2 from '../../resources/notfound.png'
import non3 from '../../resources/experience.png'
import non4 from '../../resources/nothing-to-show.png'
export default function MyAccout({ navigation }){
    return(
        <MainView>
        </MainView>
    )
}
