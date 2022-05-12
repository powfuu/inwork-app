import { React } from 'react';
import { Alert,Text } from 'react-native'
import * as e from './signupComponents'
import { MainView,Inwork } from '../../defaultStyles';
import Object from '../../resources/personal-object.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Signup({navigation}){
return(
    <MainView>
        <Text>Signup Personal</Text>
    </MainView>
);
}

