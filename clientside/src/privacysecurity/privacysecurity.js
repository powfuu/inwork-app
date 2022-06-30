import React, { useEffect, useState } from 'react';
import forgotpasswordobject from "../../resources/forgotpassword.png"
import changedpasswordsvg from '../../resources/changedpassword.png'
 import * as e from './privacysecurityComponents'
 import * as ee from '../signin/signinComponents'
import { MainView, BasicText, AddTouchable } from '../../defaultStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '@env'
import axios from 'axios'
export default function PrivacySecurity({ navigation }){
    const [devices, setDevices] = useState([])
    const [devemail,setdevemail]=useState('')
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
    const startMethod = async()=>{
    let httpToken = await AsyncStorage.getItem('@app:token')
    axios.post(`${HOST}/api/get-device`,{  }, { headers: {'Authorization': `${httpToken}`} }).then((req)=>{
            if(req.data.devices){
                setDevices(req.data.devices)
                setdevemail(req.data.devices[0].email)
            }
        })
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
    const cleardevices = () =>{
axios.post(`${HOST}/api/clear-devices`,{
email:devemail
}).then((req)=>{
setDevices(devices=>[])
})
    }

    useEffect(() =>{
        startMethod()
    navigation.getParent()?.setOptions({ tabBarStyle: { display:'none'} })
       },[])
    return(
        <MainView>
            <e.PrivacySecurity>
            <e.PrivacySecurityIc name="lock" size={24} color="black"/>
            <e.PrivacySecurityTitle>Privacity and Security</e.PrivacySecurityTitle>
            </e.PrivacySecurity>
            <e.DevicesTitleView>
                <e.DevicesIc name="cellphone-link" size={24} color="black"/>
                <e.DevicesTitle>Logged in registry</e.DevicesTitle>
                <e.DevicesTitleLine></e.DevicesTitleLine>
            </e.DevicesTitleView>
            <e.DevicesView>
                <e.DevicesScroll style={{height:'50%'}} overScrollMode="never">
           {devices.slice(0).reverse().map((device, KEY)=>{
                return( 
                    <e.DeviceKeyView key={KEY}> 
                    <>
                    <e.DevicesIc2 name="cellphone-lock" size={24} color="black"/>
                    </>
                    <e.DevicesRV>
                     <BasicText>{device.device_manufacture} - {device.device_name}</BasicText>
                    <e.DevicesDesc>inWork App</e.DevicesDesc>
                    </e.DevicesRV>
                    </e.DeviceKeyView>
                 )
            })}
                    { devices.length >= 1 ? null : <e.EmptydevicesText>Looged In Devices registry is empty.</e.EmptydevicesText> }
            </e.DevicesScroll>
            <e.ClearDevices onPress={cleardevices}>
                <e.ClearDevicesText>Clear devices list</e.ClearDevicesText>
            </e.ClearDevices>
            </e.DevicesView>
            <AddTouchable onPress={()=>{
        setfpStatus(true)
            }}>
            <e.ChangePasswordView>
                <e.ChangePasswordViewIc name="account-key" size={24} color="black"/>
                <e.ChangePasswordViewTitle>
                    Change Password
            </e.ChangePasswordViewTitle>       
            </e.ChangePasswordView>
</AddTouchable>
 {
                fPasswordStatus ?
                 <ee.ForgotPassword>
                <ee.ForgotPasswordContent>
                    <ee.ForgotPasswordExitTouchable onPress={()=>{
                        setfpStatus(false)
                        setfp1Status('flex')
                        setfp2Status('none')
                        setfp4Status('none')
                        setfp3Status('none')
                        setfpEmail('')
                        setfp3fieldp('')
                        setfp3fieldcp('')   
                           
                    }}>
                    <ee.ForgotPasswordExit></ee.ForgotPasswordExit>
                    </ee.ForgotPasswordExitTouchable>
                    <ee.ForgotPasswordText>Password Recovery</ee.ForgotPasswordText>
                    <ee.Fpstep1 display={fpstep1Status}>
                    <ee.ForgotPasswordTextContent onChangeText={(e)=>{
                        setfpEmail(e)
                    }} onBlur={()=>{
                        setfpStatusColor('rgb(230,230,230)')
                    }} onFocus={()=>/*  */{
                        setfpStatusColor('dodgerblue')
                    }} bg={fpStatusColor} placeholder='Account Email'></ee.ForgotPasswordTextContent>
                    <ee.ForgotPasswordSvg source={forgotpasswordobject}/>
                    <ee.SendVerificationContent>
                    <ee.SendVerificationCode onPress={sendVerificationCode_api}>
                        <ee.SendVerificationCodeText>Send Verification Code</ee.SendVerificationCodeText>
                    </ee.SendVerificationCode>
                    </ee.SendVerificationContent>
                    </ee.Fpstep1>
                    <ee.Fpstep2 display={fpstep2Status}>
                        <ee.Fpstep2Title>Verification Code</ee.Fpstep2Title>
                    <ee.Fpstep2InputForm>
                    <ee.Fpstep2Input onChangeText={(e)=>{
                        setI1(e)
                    }} maxLength={1} keyboardType='numeric' bg={i1bg} onFocus={()=>{
                        seti1bg('dodgerblue')
                    }} onBlur={()=>{
                        seti1bg('rgb(230,230,230)')
                    }} placeholder='x'></ee.Fpstep2Input>
                    <ee.Fpstep2Input onChangeText={(e)=>{
                        setI2(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti2bg('dodgerblue')
                    }} onBlur={()=>{
                        seti2bg('rgb(230,230,230)')
                    }} bg={i2bg} placeholder='x'></ee.Fpstep2Input>
                    <ee.Fpstep2Input onChangeText={(e)=>{
                        setI3(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti3bg('dodgerblue')
                    }} onBlur={()=>{
                        seti3bg('rgb(230,230,230)')
                    }} bg={i3bg} placeholder='x'></ee.Fpstep2Input>
                    <ee.Fpstep2Input onChangeText={(e)=>{
                        setI4(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti4bg('dodgerblue')
                    }} onBlur={()=>{
                        seti4bg('rgb(230,230,230)')
                    }} bg={i4bg} placeholder='x'></ee.Fpstep2Input>
                    <ee.Fpstep2Input onChangeText={(e)=>{
                        setI5(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti5bg('dodgerblue')
                    }} onBlur={()=>{
                        seti5bg('rgb(230,230,230)')
                    }} bg={i5bg} placeholder='x'></ee.Fpstep2Input>
                    <ee.Fpstep2Input onChangeText={(e)=>{
                        setI6(e)
                    }} maxLength={1} keyboardType='numeric' onFocus={()=>{
                        seti6bg('dodgerblue')
                    }} onBlur={()=>{
                        seti6bg('rgb(230,230,230)')
                    }} bg={i6bg} placeholder='x'></ee.Fpstep2Input>
                    </ee.Fpstep2InputForm>
                    <ee.Fpstep2Submit onPress={checkverificationcode}><ee.Fpstep2SubmitText>Check Verification Code</ee.Fpstep2SubmitText></ee.Fpstep2Submit>
                    </ee.Fpstep2>
                    <ee.Fpstep3 display={fpstep3Status}>
                        <ee.Fpstep3Form>
                        <ee.Fpstep3Field secureTextEntry={true} onChangeText={(e)=>{
                            setfp3fieldp(e)
                        }} onFocus={()=>{
                            setfpstep3fieldStatusp('dodgerblue')
                        }} onBlur={()=>{
                            setfpstep3fieldStatusp('rgb(230,230,230)')
                        }} bg={fpstep3fieldStatusp} placeholder='Choose new password'></ee.Fpstep3Field>
                        <ee.Fpstep3Field secureTextEntry={true} onChangeText={(e)=>{
                            setfp3fieldcp(e)
                        }} onFocus={()=>{
                            setfpstep3fieldStatuscp('dodgerblue')
                        }} onBlur={()=>{
                            setfpstep3fieldStatuscp('rgb(230,230,230)')
                        }} bg={fpstep3fieldStatuscp} placeholder='Confirm new password'></ee.Fpstep3Field>
                        </ee.Fpstep3Form>
                        <ee.Fpstep3Submit onPress={changePassword}>
                            <ee.Fpstep3SubmitText>Change Password</ee.Fpstep3SubmitText>
                        </ee.Fpstep3Submit>
                    </ee.Fpstep3>
                    <ee.Fpstep4 display={fpstep4Status}>
                       <ee.Fpstep4Svg source={changedpasswordsvg}/> 
                       <ee.Fpstep4Title>Password changed successfully</ee.Fpstep4Title>
                       <ee.Fpstep4Done onPress={()=>{
                           setfp1Status('flex')
                           setfp4Status('none')
                           setfpStatus(false)
                           setfpEmail('')
                           setfp3fieldp('')
                           setfp3fieldcp('')
                       }}>
                           <ee.Fpstep4DoneText>Close window</ee.Fpstep4DoneText>
                       </ee.Fpstep4Done>
                    </ee.Fpstep4>
                </ee.ForgotPasswordContent>
            </ee.ForgotPassword> 
            : null
            }
        </MainView>
    )
}
