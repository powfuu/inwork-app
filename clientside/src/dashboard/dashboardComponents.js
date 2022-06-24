import styled from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons';
import { View,Text,Image,ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native';

export const ScrollViewScene = styled(ScrollView)`
`
export const PreferencesPopup = styled(View)`
border-width: 1px;
border-color:#fff;
background-color: #fff;
width: 300px;
flex-direction: column;
align-self: center;
border-radius: 7px;
margin-top:6%;
padding-top:4px;
padding-bottom:5.5px;
padding-left:4%;
`
export const RowLogo = styled(View)`
flex-direction: row;
`
export const LogoImg = styled(Image)`
height:40px;
width:40px;
margin-top:25px;
margin-left:17px;
margin-right:12px;
`
export const SearchView = styled(View)`
flex-direction: row;
`
export const SearchIc = styled(MaterialIcons)`
margin-top:2.25%;
margin-left:-2%;
`
export const PreferencesPopupTitle = styled(Text)`
margin-top: 2.75%;
margin-bottom:2%;
font-size: 14px;
color:rgb(100,100,100);
margin-left:7.5px;
`
export const PreferencesPopupDescriptionView = styled(View)`
flex-direction: column;
`
export const PreferencesPopupPreferencesView = styled(View)`
flex-direction: column;
margin-top:.5%;
`
export const PreferencesPopupDescription = styled(Text)`
color:black;
margin-top:1%;
`
export const PreferencesPopupPreferencesPopup = styled(View)`
`
export const PreferencesPopupPreferences = styled(Text)`
color:rgb(120,120,120);
margin-left:20px;
font-size:12.5px;
padding-bottom:7px;
`
export const AccountsContent = styled(View)`
margin-top:6%;
width: 100%;
align-items: center
padding-bottom:2%;
`
export const AccountCardContent = styled(TouchableWithoutFeedback)`

`
export const AccountCard = styled(View)`
background:white;
width:88%;
border-radius:10px;
margin-bottom:6%;
padding-bottom:5%;
`
export const AccountCardBanner = styled(Image)`
height: 90px;
width:100%;
border-radius:8px;
`
export const AccountCardPic = styled(Image)`
height:55px;
width:55px;
border-radius:100px;
margin-top:-31px;
margin-left:7%;
`
export const AccountCardName = styled(Text)`
margin-left:5%;
margin-top:2.5%;
color:black;
font-size:13px;
`
export const AccountCardProfession = styled(Text)`
margin-left:5%;
position:absolute;
top:63%;
margin-right:1%;
font-size:13px;
right:0%;
color:#555;
`
export const AccountCardLocation = styled(Text)`
margin-left:1.5%;
color:#666;
font-size:11.5px;
margin-top:3.5%;
`
export const LocationIc = styled(MaterialIcons)`
margin-left:3.5%;
margin-top:2.5%;
color:#000;
`
export const LocationView= styled(View)`
flex-direction: row;
`