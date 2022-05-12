import { React } from 'react';
import { Text,Alert,Button } from 'react-native'
import * as e from './dashboardComponents'
import { MainView } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Dashboard({navigation}){
    const getToken = async()=>{
    const token = await AsyncStorage.getItem('@app:token')
    Alert.alert('Token is:',token)
    }
return(
    <MainView>
        <Button onPress={getToken} title='Token?'/>
    <Text>Dashboard</Text>
    </MainView>
);
}

