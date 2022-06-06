import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../src/dashboard/dashboard';
import Account from '../src/account/account';

const StackNavigatorApp = createNativeStackNavigator();

export default function Stack(){
    return(
        <StackNavigatorApp.Navigator initialRouteName='DashboardApp' screenOptions={{headerShown: false}}>
            <StackNavigatorApp.Screen name='DashboardApp' component={Dashboard} />
            <StackNavigatorApp.Screen name='Account' component={Account}/>
        </StackNavigatorApp.Navigator>
    )
}