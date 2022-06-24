import styled from 'styled-components'
import { TouchableHighlight, TouchableWithoutFeedback, Text, View, Image, ScrollView  } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

export const MenuView = styled(View)`
margin-top:30px;
`
export const MenuTitleView = styled(View)`
flex-direction:row;
margin-bottom:22px;
`
export const MenuIc = styled(MaterialIcons)`
margin-right:6.5px;
margin-top:2.45px;
margin-left:25px;
`
export const MenuTitle = styled(Text)`
font-weight: bold;
font-size:22px;
`
export const ProfileView = styled(View)`
flex-direction: row;
background-color: white;
border-radius: 8px;
padding-top:11px;
margin-left:0px;
padding-bottom:14px;
padding-left:13px;
padding-right: 13px;
width:85%;
align-self: center;
`
export const ProfileImage = styled(Image)`
border-radius:100px;
height:41px;
width:41px;
`
export const ProfileTextSide = styled(View)`
padding-left:13.5px;
padding-top:3.5px;
`
export const ProfileName = styled(Text)`
color:black;
font-size:13.25px;
`
export const ProfileText = styled(Text)`
color:rgb(140,140,140);
font-size:12.2px;
margin-top:0.5px;
`
export const ShortcutsView = styled(View)`
background:white;
padding:10px;
margin-top:2.5px;
padding-top:20px;
padding-bottom: 20px;
width:100%;
flex-direction:${props => props.pemlomchim};
`
export const EmptyShorcutsView = ShortcutsView;
export const EmptyShortcutsTitle = styled(Text)`
color:black;
font-size:13px;
margin-left:32px;
margin-top:25px;
margin-bottom:14px;
`
export const EmptyShortcutsText = styled(Text)`
align-self: center;
color:rgb(160,160,160);
font-size:12px;
`
export const Shortcut = styled(View)`
`
export const ShortcutImage = styled(Image)`

`
export const ShortcutText = styled(Text)`
color:black;
`
export const AllShortcutsView = styled(View)`
height:43%;
width:94%;
flex-direction: row;
flex-shrink: 1;
flex-wrap: wrap;
`
export const AllShorcut = styled(View)`
width:44%;
background:${props => props.bgColor };
border-radius:7px;
margin-bottom: 15px;
margin-left:20px;
padding-top:12px;
padding-bottom:14px;
padding-left:15px;
padding-right:10px;
`
export const AllShortcutImage = styled(Image)`
`
export const AllShortcutText = styled(Text)`
color: ${props => props.color};
margin-top:7px;
`

export const Signout = styled(TouchableHighlight)`
width:82%;
text-align:center;
align-self: center;
background:#212121;
background:#ef5350;
border-radius:5px;
padding-top:7px;
padding-bottom:7px;
margin-top:-7%;
`
export const SignoutText = styled(Text)`
color:white;
text-align: center;
font-size:13.5px;
`
export const QMSFAIc = styled(FontAwesome)`

`
export const QMSIIIc = styled(Ionicons)`

`