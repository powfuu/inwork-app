import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Menu from '../src/menu/menu'
import Account from '../src/account/myAccount'
import HrdAccount from '../src/account/account'
import SearchMatch from '../src/searchmatch/searchmatch'
import Bookmarks from '../src/bookmarks/bookmarks'
import PrivacitySecurity from '../src/privacysecurity/privacysecurity'
import AccountSettings from '../src/accountsettings/accountsettings'

const StackNavigatorApp = createNativeStackNavigator();

export default function Stack({ navigation}){
    return(
        <StackNavigatorApp.Navigator initialRouteName='MenuApp' screenOptions={{headerShown: false}}>
            <StackNavigatorApp.Screen name='MenuApp' component={Menu} />
            <StackNavigatorApp.Screen name='Account' component={Account}/>
            <StackNavigatorApp.Screen name='HrdAccount' component={HrdAccount}/>
            <StackNavigatorApp.Screen name='SearchMatch' component={SearchMatch}/>
            <StackNavigatorApp.Screen name='Bookmarks' component={Bookmarks}/>
            <StackNavigatorApp.Screen name='PrivacitySecurity' component={PrivacitySecurity}/>
            <StackNavigatorApp.Screen name='AccountSettings' component={AccountSettings}/>
        </StackNavigatorApp.Navigator>
    )
}