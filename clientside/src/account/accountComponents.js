import styled from 'styled-components'
import { TouchableHighlight, TouchableWithoutFeedback,Text,View,Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const AppScrollView = styled(ScrollView)`
`
export const AccountInitialSection = styled(View)`
align-items: center;
`
export const Banner = styled(Image)`
height:200px;
width:100%;
`
export const Pic = styled(Image)`
height:75px;
width: 75px;
border-radius:100px;
margin-top:-45px;
`
export const AccountName = styled(Text)`
font-size:15px;
color:rgb(100,100,100);
margin-top:1.2%;
`
export const AccountType = styled(Text)`
align-self: flex-end;
margin-right:10%;
margin-top: -5px;
color: dodgerblue;
`
export const StarVal = styled(Text)`
font-size:12px;
color:rgb(100,100,100);
`
export const AccountProfessionView = styled(View)`
margin-top:2%;
`
export const AccountProfession = styled(Text)`
color:rgb(110,110,110);
font-size:12px;
`
export const AccountProfessionStar = styled(MaterialIcons)`
`
export const AccountBiography = styled(Text)`
color:rgb(100,100,100);
margin-top:2.2%;
width:91%;
text-align:center;
font-size:12.5px;
`
export const Section = styled(View)`
margin-top:7%;
`
export const AccountTagsTitleView = styled(View)`
width: 100%;
flex-direction: row;
padding-left:10%;
`
export const AccountTagsTitle = styled(Text)`
color:rgb(100,100,100);
font-weight: 500;
font-size:14.75px;
`
export const SectionTitles = styled(Text)`
margin-top: 50px;
margin-bottom:5px;
`
export const AccountTagsIc = styled(MaterialIcons)`
margin-top:-2px;
margin-left:2%;
margin-right:1.8%;
`
export const AccountTagsNumber = styled(Text)`
color: rgb(100,100,100);
font-size:13.4px;
`
export const SectionBody = styled(View)`

`
export const NoSectionBody = styled(View)`
align-items: center;
padding-top:25px;
`
export const NoText = styled(Text)`
color:rgb(180,180,180);
font-size:13.5px;
`
export const NoSvg = styled(Image)`
height:120px;
width:43%;
opacity: 0.5;
margin-top:24px;
`
export const LinksView = styled(View)`
margin-bottom: 40px;
`
export const AccountInteractivity = styled(View)`
flex-direction: row;
justify-content: center;
margin-top: 22px;
margin-bottom: 0px;
`
export const RequestMatchText = styled(Text)`
background: #212121;
padding:10px
padding-left: 17px;
padding-right: 17px;
color:white;
font-size:12px;
border-radius: 25px;
`
export const ToggleStar = styled(MaterialIcons)`
margin-left: 7px;
margin-top: -1px;
`
export const AddTouchable = styled(TouchableWithoutFeedback)`

`