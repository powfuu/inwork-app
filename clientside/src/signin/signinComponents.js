import styled from "styled-components";
import { TouchableWithoutFeedback,Dimensions, View, Text, Image, TextInput, TouchableHighlight } from "react-native";
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context'
const androidWidth = Dimensions.get('window').width;
const androidHeight = Dimensions.get('window').height + 70;
export const Background = styled(Image)`
height:22.5%;
width: 70%;
margin-left:-2.15%;
align-self: center;
margin-top:9%;
`
export const Signin = styled(View)`
align-items: center;
height:100%;
border-radius: 7px;
align-items: center;
align-self: center;
margin-top:6%;
background: white;
`
export const Title = styled(Text)`
color:black;
font-size: 18px;
`
export const Inworksvg = styled(Image)`
height:65px;
width:65px;
margin-bottom:25px;
margin-top:18px;
opacity: .85;
`
export const FormContainer = styled(View)`
margin-top:40px;
width:${androidWidth}px;
align-items: center;
`
export const InputForm = styled(TextInput)` 
border-width:1px;
border-radius: 80px;
border-color: ${props => props.bg};
padding-left: 22px;
padding-right:20px;
width: 70%;
height: 11%;
margin-bottom: 3.5%;
color:#20E15D;
`
export const Ydha = styled(Text)` 
color:rgb(145,145,145);
margin-top:32px;
font-size: 12.5px;
text-decoration: underline;
`
export const SigninButton = styled(TouchableHighlight)` 
background-color: #24252A;
margin-top:30px;
padding-left:16px; padding-right:16px;
padding-top:9px; padding-bottom: 9px;
border-radius:100px;
align-self: flex-end;
margin-right:40px;
`
export const SigninTextButton = styled(Text)` 
color:white;
`
export const Footer = styled(View)`
position:absolute;
flex-direction: row;
flex-wrap: wrap;
bottom:0;
align-self: center;
`
export const FooterItem = styled(Text)`
color:rgb(150,150,150);
padding-left:5%;
text-decoration: underline;
margin-bottom:4.5%;
font-size:12px;
`
export const CheckView = styled(View)`
flex-direction: row;
margin-top:12px;
`
export const ShowHide = styled(Checkbox)`
border-radius: 4px;
margin-left:-32%;
`
export const ShowHideText = styled(Text)`
margin-left:7px;
font-size:13px;
color:rgb(140,140,140);
`
export const ForgotPassword = styled(View)`
background:rgba(0,0,0,.7);
position:absolute;
height:${androidHeight}px;
width:100%;
justify-content: center;
`
export const ForgotPasswordContent = styled(View)`
background:white;
align-self: center;
align-items: center;
padding:18px;
border-radius:10px;
width:90%;
flex-wrap: wrap;
padding-bottom:10%;
flex-direction: row;
padding-top:25px;
`
export const ForgotPasswordExit = styled(View)`
border-radius: 100px;
height: 17px;
width:17px;
background:red;
margin-left:10px;
`
export const ForgotPasswordExitTouchable = styled(TouchableWithoutFeedback)``
export const ForgotPasswordText = styled(Text)`
margin-left: 13px;
margin-top:2.5px;
`
export const ForgotPasswordTextContent = styled(TextInput)`
width: 80%;
margin-top: 58px;
border-radius:100px;
padding:5px;
color:#20E15D;
margin-left:10px;
padding-right: 18px;
border-color: ${props=>props.bg};
padding-left:18px;
border-width: 1px;
`
export const ForgotPasswordSvg = styled(Image)`
height:130px;
width:200px;
opacity: .8;
left:12%;
top:44%;
`
export const SendVerificationContent = styled(View)`
width:100%;
align-items: flex-end;
padding-right:10px;
`
export const SendVerificationCode = styled(TouchableHighlight)`
background:#24252A;
border-radius:6px;
padding-left:10px;
padding-right:10px;
padding-top:6px;
padding-bottom:6px;
margin-top:48px;
`
export const SendVerificationCodeText = styled(Text)`
color:white;
`
export const Fpstep1 = styled(View)`
display: ${props => props.display}
align-self: center;
align-items: center;
flex-wrap: wrap;
flex-direction: row;
`
export const Fpstep2 = styled(View)`
display: ${props => props.display}
align-self: center;
align-items: center;
flex-wrap: wrap;
flex-direction: row;
`
export const Fpstep2Title = styled(Text)`
width: 100%;
color:black;
font-weight: bold;
font-size:15px;
margin-left:20px;
margin-top:42px;
`
export const Fpstep2InputForm = styled(View)`
flex-wrap: wrap;
flex-direction: row;
left:8%;
padding-bottom:15%;
`
export const Fpstep2Input = styled(TextInput)`
border-width: 1px;
text-align: center;
height:40px;
color:white;
width:35px;
border-radius: 4px;
margin-right:8px;
font-size:16px;
color: #23ff3e;
border-color: ${props => props.bg};
`
export const Fpstep2Submit = styled(TouchableHighlight)`
background:#24252A;
border-radius:6px;
padding-left:10px;
padding-right:10px;
padding-top:6px;
padding-bottom:6px;
align-self: flex-end;
position: absolute;
right:0;
top:75%;
`
export const Fpstep2SubmitText = styled(Text)`
color:white;
`
export const Fpstep3 = styled(View)`
display: ${props => props.display}
align-self: center;
align-items: center;
flex-wrap: wrap;
flex-direction: row;
width:100%;
`
export const Fpstep3Form = styled(View)`
margin-top:45px;
margin-left:5%;
`
export const Fpstep3Field = styled(TextInput)`
margin-bottom:6%;
border-width: 1px;
text-align: center;
border-radius: 100px;
padding-top:2px; padding-bottom:2px;
padding-right:18px;
border-color: ${props => props.bg};
direction: rtl;
`
export const Fpstep3Submit = styled(TouchableHighlight)`
background:#24252A;
border-radius:6px;
padding-left:10px;
padding-right:10px;
padding-top:6px;
padding-bottom:6px;
position: absolute;
top:76%;
right:0;
margin-right:2%;
`
export const Fpstep3SubmitText = styled(Text)`
color:white;
`
export const Fpstep4 = styled(View)`
display: ${props => props.display};
align-items: center;
width:100%;
`
export const Fpstep4Title = styled(Text)`
color:rgb(120,120,120);
`
export const Fpstep4Svg = styled(Image)`
height:130px;
width:200px;
margin-top:25px;
margin-bottom:20px;
`
export const Fpstep4Done = styled(TouchableHighlight)`
background:#24252A;
border-radius:6px;
padding-left:10px;
padding-right:10px;
padding-top:6px;
padding-bottom:6px;
margin-top:25px;
`
export const Fpstep4DoneText = styled(Text)`
color:white;
`