import React, { useState, useEffect } from "react";
import { MainView,Inwork,Debug } from '../../defaultStyles'
import * as e from "./signinComponents";
import logo from "../../resources/logo-inwork.png"
import axios from "axios";
import signinsvg from '../../resources/login.png'
import changedpasswordsvg from '../../resources/changedpassword.png'
import forgotpasswordobject from "../../resources/forgotpassword.png"
import { Alert,Linking, NativeModules } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST } from '@env'
    

export default function Signin({ navigation }) {

    const [Iemail, setIemail] = useState('rgb(230,230,230)')
    const [Ipassword, setIpassword] = useState('rgb(230,230,230)')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [secureEntry, setSecureEntry]=useState(false);
    const [loginStatus, setLoginStatus]=useState(false)
    
    const [fpStatusColor, setfpStatusColor]=useState('rgb(230,230,230)')
    
    const [fPasswordStatus, setfpStatus]=useState(false)
    const [fpEmail, setfpEmail]=useState('')

    const [fpstep1Status, setfp1Status]=useState('flex')
    const [fpstep2Status, setfp2Status]=useState('none')
    const [fpstep3Status, setfp3Status]=useState('none')
    const [fpstep4Status, setfp4Status]=useState('none')

    const [i1bg, seti1bg]=useState('rgb(230,230,230)')
    const [i2bg, seti2bg]=useState('rgb(230,230,230)')
    const [i3bg, seti3bg]=useState('rgb(230,230,230)')
    const [i4bg, seti4bg]=useState('rgb(230,230,230)')
    const [i5bg, seti5bg]=useState('rgb(230,230,230)')
    const [i6bg, seti6bg]=useState('rgb(230,230,230)')

    const [i1,setI1]=useState('')
    const [i2,setI2]=useState('')
    const [i3,setI3]=useState('')
    const [i4,setI4]=useState('')
    const [i5,setI5]=useState('')
    const [i6,setI6]=useState('')

    const [fpstep3fieldStatusp, setfpstep3fieldStatusp]=useState('rgb(230,230,230)')
    const [fpstep3fieldStatuscp, setfpstep3fieldStatuscp]=useState('rgb(230,230,230)')
    const [fpstep3fieldp, setfp3fieldp]=useState('')
    const [fpstep3fieldcp, setfp3fieldcp]=useState('')
    
    const [httpToken,setHttpToken]=useState('')

    const getToken = async()=>{
        if(await AsyncStorage.getItem('@app:token') != null){
        setHttpToken(await AsyncStorage.getItem('@app:token'))
        navigation.navigate('Dashboard')
        }else if(await AsyncStorage.getItem('@app:token') === null){
            setHttpToken('EXPIRED_TOKEN')
        }
    }
    useEffect(()=>{
        getToken()
    },[])

const Signin = () =>{
    setLoginStatus(true)
        axios.post(`${HOST}/api/signin`,{
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
                NativeModules.DevSettings.reload()
            }
        })
    }
    const handleForgotPassword = () =>{ 
        setfpStatus(true)
    }
    const sendVerificationCode_api = () =>{
        axios.post(`${HOST}/api/send-verification-code`,{
            verificationE:fpEmail
        }).then((req)=>{
            if(req.data.sended_code){
                setfp1Status('none')
                setfp2Status('flex')
            }else if(req.data.failed_sending_code){
                setfpStatusColor('#FF7979')
                Alert.alert('Error while recovering','Inserted email does not exist in our platform, please check if your email is correct.')
            }
        })
    }
    const checkverificationcode = () =>{
        axios.post(`${HOST}/api/check-verification-code`,{
            verificationE:fpEmail,
            verCode:i1+i2+i3+i4+i5+i6
        }).then((req)=>{
            if(req.data.codeMatch){
                setfp2Status('none')
                setfp3Status('flex')
            }else if(req.data.codeMatchInverse){
                seti1bg('#FF7979')
                seti2bg('#FF7979')
                seti3bg('#FF7979')
                seti4bg('#FF7979')
                seti5bg('#FF7979')
                seti6bg('#FF7979')
                Alert.alert('Error while recovering', 'Inserted code does not match with any valid code in our platform, please check if it is correct!')
            }
        })
    }
    const changePassword = () =>{ 
        axios.post(`${HOST}/api/change-account-password`,{
           newP:fpstep3fieldp,
           cNewP:fpstep3fieldcp,
           email:fpEmail
        }).then((req)=>{
            if(req.data.changedPassword){
                setfp3Status('none')
                setfp4Status('flex')
            }
            if(req.data.changedPasswordInverse){
                Alert.alert('Error while changing password','Password length must be bigger than 6 characters, and same than confirm password field.')
                setfpstep3fieldStatusp('#FF7979')
                setfpstep3fieldStatuscp('#FF7979')
            }
        })
    }
  if(httpToken === 'EXPIRED_TOKEN'){
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
                <e.FooterItem onPress={()=>{
                Linking.openURL('http://www.google.com/');
                }}>Terms & Conditions</e.FooterItem>
                <e.FooterItem onPress={handleForgotPassword}>Forgot Password?</e.FooterItem>
                <e.FooterItem onPress={()=>{
                Linking.openURL('http://www.google.com/');
                }}>Official Website</e.FooterItem>
            </e.Footer>
            {
                fPasswordStatus ?
                 <e.ForgotPassword>
                <e.ForgotPasswordContent>
                    <e.ForgotPasswordExitTouchable onPress={()=>{
                        setfpStatus(false)
                        setfp1Status('flex')
                        setfp2Status('none')
                        setfp4Status('none')
                        setfp3Status('none')
                        setfpEmail('')
                        setfp3fieldp('')
                        setfp3fieldcp('')   
                           
                    }}>
                    <e.ForgotPasswordExit></e.ForgotPasswordExit>
                    </e.ForgotPasswordExitTouchable>
                    <e.ForgotPasswordText>Password Recovery</e.ForgotPasswordText>
                    <e.Fpstep1 display={fpstep1Status}>
                    <e.ForgotPasswordTextContent onChangeText={(e)=>{
                        setfpEmail(e)
                    }} onBlur={()=>{
                        setfpStatusColor('rgb(230,230,230)')
                    }} onFocus={()=>/*  */{
                        setfpStatusColor('#23ff3e')
                    }} bg={fpStatusColor} placeholder='Account Email'></e.ForgotPasswordTextContent>
                    <e.ForgotPasswordSvg source={forgotpasswordobject}/>
                    <e.SendVerificationContent>
                    <e.SendVerificationCode onPress={sendVerificationCode_api}>
                        <e.SendVerificationCodeText>Send Verification Code</e.SendVerificationCodeText>
                    </e.SendVerificationCode>
                    </e.SendVerificationContent>
                    </e.Fpstep1>
                    <e.Fpstep2 display={fpstep2Status}>
                        <e.Fpstep2Title>Verification Code</e.Fpstep2Title>
                    <e.Fpstep2InputForm>
                    <e.Fpstep2Input onChangeText={(e)=>{
                        setI1(e)
                    }} maxLength={1} keyboardType='numeric' bg={i1bg} onFocus={()=>{
                        seti1bg('#23ff3e')
                    }} onBlur={()=>{
                        seti1bg('rgb(230,230,230)')
                    }} placeholder='x'></e.Fpstep2Input>
                    <e.Fpstep2Input onChangeText={(e)=>{
                        setI2(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti2bg('#23ff3e')
                    }} onBlur={()=>{
                        seti2bg('rgb(230,230,230)')
                    }} bg={i2bg} placeholder='x'></e.Fpstep2Input>
                    <e.Fpstep2Input onChangeText={(e)=>{
                        setI3(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti3bg('#23ff3e')
                    }} onBlur={()=>{
                        seti3bg('rgb(230,230,230)')
                    }} bg={i3bg} placeholder='x'></e.Fpstep2Input>
                    <e.Fpstep2Input onChangeText={(e)=>{
                        setI4(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti4bg('#23ff3e')
                    }} onBlur={()=>{
                        seti4bg('rgb(230,230,230)')
                    }} bg={i4bg} placeholder='x'></e.Fpstep2Input>
                    <e.Fpstep2Input onChangeText={(e)=>{
                        setI5(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti5bg('#23ff3e')
                    }} onBlur={()=>{
                        seti5bg('rgb(230,230,230)')
                    }} bg={i5bg} placeholder='x'></e.Fpstep2Input>
                    <e.Fpstep2Input onChangeText={(e)=>{
                        setI6(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti6bg('#23ff3e')
                    }} onBlur={()=>{
                        seti6bg('rgb(230,230,230)')
                    }} bg={i6bg} placeholder='x'></e.Fpstep2Input>
                    </e.Fpstep2InputForm>
                    <e.Fpstep2Submit onPress={checkverificationcode}><e.Fpstep2SubmitText>Check Verification Code</e.Fpstep2SubmitText></e.Fpstep2Submit>
                    </e.Fpstep2>
                    <e.Fpstep3 display={fpstep3Status}>
                        <e.Fpstep3Form>
                        <e.Fpstep3Field secureTextEntry={true} onChangeText={(e)=>{
                            setfp3fieldp(e)
                        }} onFocus={()=>{
                            setfpstep3fieldStatusp('#23ff3e')
                        }} onBlur={()=>{
                            setfpstep3fieldStatusp('rgb(230,230,230)')
                        }} bg={fpstep3fieldStatusp} placeholder='Choose new password'></e.Fpstep3Field>
                        <e.Fpstep3Field secureTextEntry={true} onChangeText={(e)=>{
                            setfp3fieldcp(e)
                        }} onFocus={()=>{
                            setfpstep3fieldStatuscp('#23ff3e')
                        }} onBlur={()=>{
                            setfpstep3fieldStatuscp('rgb(230,230,230)')
                        }} bg={fpstep3fieldStatuscp} placeholder='Confirm new password'></e.Fpstep3Field>
                        </e.Fpstep3Form>
                        <e.Fpstep3Submit onPress={changePassword}>
                            <e.Fpstep3SubmitText>Change Password</e.Fpstep3SubmitText>
                        </e.Fpstep3Submit>
                    </e.Fpstep3>
                    <e.Fpstep4 display={fpstep4Status}>
                       <e.Fpstep4Svg source={changedpasswordsvg}/> 
                       <e.Fpstep4Title>Password changed successfully</e.Fpstep4Title>
                       <e.Fpstep4Done onPress={()=>{
                           setfp1Status('flex')
                           setfp4Status('none')
                           setfpStatus(false)
                           setfpEmail('')
                           setfp3fieldp('')
                           setfp3fieldcp('')
                       }}>
                           <e.Fpstep4DoneText>Close window</e.Fpstep4DoneText>
                       </e.Fpstep4Done>
                    </e.Fpstep4>
                </e.ForgotPasswordContent>
            </e.ForgotPassword> 
            : null
            }

        </MainView>
    );
        }else if(httpToken != 'EXPIRED_TOKEN'){
            return(
                <></>
            )
        }
}
