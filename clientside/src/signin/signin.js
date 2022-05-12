import { React, useState } from "react";
import { MainView,Inwork,Debug } from '../../defaultStyles'
import * as e from "./signinComponents";
import logo from "../../resources/logo-inwork.png"
import axios from "axios";
import signinsvg from '../../resources/login.png'
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Signin({ navigation }) {
    const [Iemail, setIemail] = useState('rgb(230,230,230)')
    const [Ipassword, setIpassword] = useState('rgb(230,230,230)')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [secureEntry, setSecureEntry]=useState(false);
    const [loginStatus, setLoginStatus]=useState(false)

    const Signin = () =>{
        setLoginStatus(true)
        axios.post('http://192.168.1.104:3001/api/signin',{
            email:email,
            password:password
        }).then(async(req)=>{
            setLoginStatus(false)
            if(req.data.failed_signin){
                setIemail('#FF7979')
                setIpassword('#FF7979')
                Alert.alert(
                    "ERROR: Invalid Account",
                    "No one account match with selected combination.",
                  );
            }else if(req.data.token){
                await AsyncStorage.setItem('@app:token',req.data.token)
                 navigation.navigate('Dashboard')
            }
        })
    }
    return (
        <MainView>
            <e.Background source={signinsvg}/>
            <e.Signin>
            <e.Inworksvg source={logo}/>
            <e.Title>Signin to <Inwork>inWork</Inwork> </e.Title>
            <e.FormContainer>
                    <e.InputForm placeholderTextColor="rgb(180,180,180)" onChangeText={(props)=>{
                        setEmail(props)
                    }} bg={Iemail} onBlur={()=>{
                        setIemail('rgb(230,230,230)')
                    }} onFocus={()=>{
                        setIemail('#23ff3e')
                    }} placeholder="Email"  />
                    <e.InputForm placeholderTextColor="rgb(180,180,180)" onChangeText={(props)=>{
                        setPassword(props)
                    }} secureTextEntry={!secureEntry} bg={Ipassword} onBlur={()=>{
                        setIpassword('rgb(230,230,230)')
                    }} onFocus={()=>/*  */{
                        setIpassword('#23ff3e')
                    }} placeholder="Password" />
                   <e.CheckView>
                   <e.ShowHide color={"#23ff33"} value={secureEntry} onValueChange={()=>{setSecureEntry(entry => !entry)}}/>
                   <e.ShowHideText>Show Password</e.ShowHideText>
                   </e.CheckView>
            <e.Ydha onPress={()=>{
             navigation.navigate('Signup')  
            }}>You do not have an account? Signup now!</e.Ydha>
            <e.SigninButton onPress={Signin} disabled={loginStatus}>
               <e.SigninTextButton>Log In</e.SigninTextButton> 
            </e.SigninButton>
            </e.FormContainer>
            </e.Signin>
            <e.Footer>
                <e.FooterItem>Terms & Conditions</e.FooterItem>
                <e.FooterItem>Forgot Password?</e.FooterItem>
                <e.FooterItem>Official Website</e.FooterItem>
            </e.Footer>
        </MainView>
    );
}
