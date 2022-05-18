import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation"
import BottomNav from './src/bottomnav/bottomnav'
import Signin from './src/signin/signin'
import Signup from './src/signup/signup'
import Dashboard from "./src/dashboard/dashboard";
import SignupPersonal from './src/signup/signup-personal'
import SignupBusiness from './src/signup/signup-business'
import Chat from './src/chat/chat'
import Explore from './src/explore/explore'
import Notifications from './src/notifications/notifications'
import Menu from './src/menu/menu'
const stack = createStackNavigator({
  Signin: Signin,
  Signup: Signup,
  Dashboard: Dashboard,
  SignupBusiness: SignupBusiness,
  SignupPersonal: SignupPersonal,
  Chat:Chat,
  Explore:Explore,
  Notifications:Notifications,
  Menu:Menu,
},
{
initialRouteName: 'Signin',
defaultNavigationOptions: {
headerShown: false,
},
}
);
export default createAppContainer(stack);
