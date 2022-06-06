import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from '../src/chat/chat';
import Account from '../src/account/account';

const StackNavigatorApp = createNativeStackNavigator();

export default function Stack(){
    return(
        <StackNavigatorApp.Navigator initialRouteName='ChatApp' screenOptions={{headerShown: false}}>
            <StackNavigatorApp.Screen name='ChatApp' component={Chat} />
            <StackNavigatorApp.Screen name='Account' component={Account}/>
        </StackNavigatorApp.Navigator>
    )
}