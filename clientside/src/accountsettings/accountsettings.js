import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from './components/main'
import Information from './components/information'
import Langloc from './components/langloc'
import Links from './components/links'
import Preferences from './components/preferences'
import Skilltags from './components/skilltags'
import Ep from './components/ep'
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
const StackNavigatorApp = createNativeStackNavigator();

export default function Stack({ navigation }){
    useEffect(() =>{

            navigation.getParent()?.setOptions({
                 tabBarStyle: 
                 {
                     display:'none'
                  }
})
       },[])
return(
        <StackNavigatorApp.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
            <StackNavigatorApp.Screen name='Main' component={Main} />
            <StackNavigatorApp.Screen name='Information' component={Information}/>
            <StackNavigatorApp.Screen name='Langloc' component={Langloc}/>
            <StackNavigatorApp.Screen name='Links' component={Links}/>
            <StackNavigatorApp.Screen name='Preferences' component={Preferences}/>
            <StackNavigatorApp.Screen name='Skilltags' component={Skilltags}/>
            <StackNavigatorApp.Screen name='Ep' component={Ep}/>
        </StackNavigatorApp.Navigator>
    )
}
