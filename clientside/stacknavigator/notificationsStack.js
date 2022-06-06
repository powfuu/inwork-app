import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Notifications from '../src/notifications/notifications'
import Account from '../src/account/account';
const StackNavigatorApp = createNativeStackNavigator();
export default function Stack(){
    return(
        <StackNavigatorApp.Navigator initialRouteName='NotificationsApp' screenOptions={{headerShown: false}}>
            <StackNavigatorApp.Screen name='NotificationsApp' component={Notifications} />
            <StackNavigatorApp.Screen name='Account' component={Account}/>
        </StackNavigatorApp.Navigator>
    )
}