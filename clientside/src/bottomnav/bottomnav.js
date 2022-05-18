import React, { useEffect,useState } from 'react';
import { MainViewBottomNav } from '../../defaultStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeModules } from 'react-native'
import * as e from './bottomnavComponents'
export default function BottomNav(){
    const [activeIco, setActiveIco] = useState('#000000')
    const [inactiveIco, setInactiveIco] = useState('#999')
    const [httpToken,setHttpToken]=useState("")
    const getToken = async()=>{
        if(await AsyncStorage.getItem('@app:token') != null){
        setHttpToken("NON_EXPIRED_TOKEN")
        }
    }
    useEffect(()=>{
        getToken()
    },[])
    if(httpToken === "NON_EXPIRED_TOKEN"){
    return(
        <MainViewBottomNav>
           <e.NavIcon onPress={()=>{
                navigation.navigate('SignupPersonal')
            }} name="dashboard" size={25} color={activeIco} />
            <e.NavIcon onPress={()=>{
                navigation.navigate('Chat')
            }} name="chat" size={23} color={inactiveIco} />
            <e.NavIcon onPress={()=>{
                navigation.navigate('Explore')
            }} name="explore" size={25} color={inactiveIco} />
            <e.NavIcon onPress={()=>{
                navigation.navigate('Notifications')
            }} name="notifications" size={25} color={inactiveIco} />
            <e.NavIcon onPress={()=>{
                navigation.navigate('Menu')
            }} name="menu" size={29} color={inactiveIco} />
       </MainViewBottomNav>
    )
    }else if(httpToken != 'NON_EXPIRED_TOKEN'){
        return(
            <></>
        )
    }
}