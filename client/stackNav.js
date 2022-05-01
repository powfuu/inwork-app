import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation"
import Signin from './src/signin/signin'
import Signup from './src/signup/signup'

const stack = createStackNavigator({
  Signin: Signin,
  Signup: Signup,
},
{
  defaultNavigationOptions: {
headerShown: false,
  }
}
);
export default createAppContainer(stack);
