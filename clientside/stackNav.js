import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ChatStack from './stacknavigator/chatStack'
import ExploreStack from './stacknavigator/explorerStack'
import NotificationsStack from './stacknavigator/notificationsStack'
import MenuStack from './stacknavigator/menuStack'
import DashboardStack from './stacknavigator/homeStack'
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';

const Tab = createBottomTabNavigator()

function AppNavigator(){
    return( 
        <Tab.Navigator initialRouteName='Dashboard' 
         screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: '#999',
        }}>
            <Tab.Screen options={{
                tabBarIcon: ({color, size}) => (<MaterialIcons name="dashboard" color={color} size={size}/>),
            }} name="Dashboard" component={DashboardStack}/>
            <Tab.Screen name="Chat" options={{
                tabBarBadge:6,
                tabBarIcon: ({color, size}) => (<MaterialIcons name="chat" color={color} size={size}/>)
            }} component={ChatStack}/>
            <Tab.Screen name="Explore" options={{
                tabBarIcon: ({color, size}) => (<MaterialIcons name="explore" color={color} size={size}/>)
            }} component={ExploreStack}/>
            <Tab.Screen name="Notifications" options={{
                tabBarBadge: 3,
                tabBarIcon: ({color, size}) => (<MaterialIcons name="notifications" color={color} size={size}/>)
            }} component={NotificationsStack}/>
            <Tab.Screen name="Menu" options={{
                tabBarIcon: ({color, size}) => (<MaterialIcons name="menu" color={color} size={size}/>)
            }} component={MenuStack}/>
        </Tab.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
}