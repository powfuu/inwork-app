import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text,View,Dimensions,TouchableWithoutFeedback, ScrollView } from 'react-native'
export const MainView = styled(SafeAreaView)` 
height: 100%;
background:white;
`
export const MainViewApp = styled(SafeAreaView)` 
height: 100%;
background:rgb(242,242,242);
`
export const Inwork = styled(Text)` 
color:dodgerblue;
`
export const Debug = styled(Text)`
color:red;
font-size:18px;
`
export const MainViewBottomNav = styled(SafeAreaView)` 
position:absolute;
bottom:0;
height:7.75%;
padding-left:38px;
background:#ffffff;
width:100%;
flex-direction: row;
text-align: center;
align-items: center;
justify-content: center;
border-top-width: 1px;
border-color: rgb(225,225,225);
padding-top:15px;
padding-bottom:15px;
`
export const BasicText = styled(Text)`

`
export const AddTouchable = styled(TouchableWithoutFeedback)`

`
export const SkilltagScrollView = styled(ScrollView)`
margin-top: ${props => props.mtop}px;
margin-left: ${props => props.mleft}px;
height: ${props => props.height}%;
`
export const Div = styled(View)`
margin-top: ${props => props.mtop}px;
margin-left: ${props => props.mleft}px;
`
