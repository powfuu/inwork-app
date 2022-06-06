import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Menu from '../src/menu/menu'
import Account from '../src/account/account';

const StackNavigatorApp = createNativeStackNavigator();

export default function Stack(){
    return(
        <StackNavigatorApp.Navigator initialRouteName='MenuApp' screenOptions={{headerShown: false}}>
            <StackNavigatorApp.Screen name='MenuApp' component={Menu} />
            <StackNavigatorApp.Screen name='Account' component={Account}/>
        </StackNavigatorApp.Navigator>
    )
}