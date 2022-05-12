import styled from "styled-components";
import { Dimensions, View, Text, Image, TextInput, TouchableHighlight } from "react-native";
import Checkbox from 'expo-checkbox';
const androidWidth = Dimensions.get('window').width;
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