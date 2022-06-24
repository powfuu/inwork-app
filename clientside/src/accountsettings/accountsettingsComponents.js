import styled from 'styled-components';
import { Text, View, TextInput, Image } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

export const TitleView = styled(View)`
flex-direction: row;
padding-left:15.25px;
padding-top:28px;
`
export const TitleIc = styled(MaterialCommunityIcons)`

`
export const TitleText = styled(Text)`
font-size:18px;
margin-top:1px;
margin-left:8.75px;
`
export const TitleLine = styled(Text)`
border-top-width: 1px;
border-top-color: rgb(235,235,235);
width:63%;
margin-top:13px;
margin-left:16px;
`
export const ListView = styled(View)`
margin-top:17px;
`
export const ListViewContent = styled(View)`
border-bottom-width: 1px;
border-bottom-color: rgb(230,230,230);
padding-bottom:16px;
margin-top:15px;
display: ${prop => prop.dis};
`
export const ListViewRow = styled(View)`
flex-direction: row;
`
export const ListViewRowRight = styled(View)`
margin-left:8px;
`
export const ListViewTitle = styled(Text)`
font-size:14px;
`
export const ListViewDescription = styled(Text)`
font-size:12px;
color:rgb(155,155,155);
margin-top:2px;
`
export const ListViewIc = styled(MaterialCommunityIcons)`
margin-top:5px;
margin-left:13px;
margin-right: 7px;
`
export const CirclesView = styled(View)`
flex-direction:row;
align-self:center;
align-items: center;
margin-top:32px;
`
export const CirclesViewCustom = styled(View)`
flex-direction:row;
align-self:center;
align-items: center;
margin-top:${props=>props.mtop}px;
`
export const CircleView = styled(View)`
border-radius:100px;
height:53px;
width:53px;
background:${props => props.bg};
margin-right: 15px;
`
export const CircleIc = styled(MaterialCommunityIcons)`
align-self: center;
margin-top:14px;
`
export const TitleViewSection = styled(View)`
flex-direction:row;
margin-top:17px;
margin-left:13px;
border-bottom-width: 1px;
border-bottom-color: rgb(225,225,225);
margin-right: 13px;
padding-bottom:15px;
`
export const TitleSection = styled(Text)`
font-size:18px;
margin-left:8px;
margin-top:3.5px;
`
export const TitleSectionIc = styled(MaterialCommunityIcons)`
margin-top:2px;
`
export const SectionView = styled(View)`
margin-top: ${props => props.mgtop}px;
margin-left: ${props => props.mgleft}px;
`
export const SectionViewTitle = styled(Text)`
font-size:17px;
`
export const SectionViewDescription = styled(Text)`
color:#999;
font-size:13px;
margin-right:26px;
margin-top:4px;
`
export const SectionViewInput = styled(TextInput)`
border-width: 1px;
border-color: rgb(210,210,210);
margin-right: 7%;
border-radius: 6px;
padding-left:15px;
padding-top:3px;
padding-bottom: 4.5px;
margin-bottom:13px;
border-color:${props => props.fg};
`
export const SectionViewInputHash = styled(TextInput)`
border-width: 1px;
border-color: rgb(210,210,210);
margin-right: 7%;
border-radius: 6px;
padding-left:12px;
padding-right:12px;
padding-top:3px;
padding-bottom: 4.5px;
margin-bottom:13px;
border-color:${props => props.fg};
`
export const AddHashButton = styled(Text)`
padding-top:9px; padding-bottom:9px;
text-align:center;
background:#212112;
color:white;
border-radius:7px;
width:90px;
margin-top:4px;
align-self:flex-end;
margin-right:25px;
`
export const EmptySectionTitle = styled(Text)`
color:#999;
margin-top:9px;
`
export const EmptySectionImg = styled(Image)`
height:180px;
width:220px;
`
export const SectionViewRow = styled(View)`
margin-top: ${props => props.mgtop}px;
margin-left: ${props => props.mgleft}px;
flex-direction:row;
`
export const SectionViewRowIc = styled(MaterialIcons)`

`
export const SectionViewRowTitle = styled(Text)`
margin-top:2.65px;
margin-left:6px;
font-size:15px;
`
export const SkilltagsView = styled(View)`
margin-bottom: 25px;
padding-bottom:10px;
border-bottom-width: 1px;
margin-right:20px;
border-bottom-color: rgb(220,220,220);
`
export const SkilltagItem = styled(Text)`
align-self: flex-start;
color:rgb(80,80,80);`
export const RemoveSkilltag = styled(MaterialCommunityIcons)`
align-self: flex-end;
margin-top:-22px;
margin-right: 16px;
`
export const LoaderView = styled(View)`
position:absolute;
left:44%;
top:53%;
`
export const LinksTitle = styled(Text)`
color:black;
font-weight:bold;
font-size:19px;
`
export const LinksDescription = styled(Text)` 
margin-top:2px;
    color:#777;
`
export const EmptySectionView = styled(View)`
align-items:center;
width: 90%;
margin-top:24%;
opacity:.6;
margin-bottom:35%;
`
export const LocatedView = styled(View)` 
    flex-direction:row;
    margin-top:2px;
    padding-bottom:8px;
`
export const LocatedText = styled(Text)` 
    font-size:16px;
    margin-bottom:3.5px;
`
export const LocatedInput = styled(TextInput)` 
    border-bottom-width:1px;
    border-bottom-color:${props=>props.fg};
    padding-top:0px;
padding-bottom:2px;
    font-size:15px;
    width:42%;
    padding-left:5px;
`
export const Locatedcomma = styled(Text)` 
    margin-right:6px;
    margin-left:6px;
    font-size:22px;
`
export const UpdateLocationButton = styled(Text)` 
    background:#212121;
    align-self:flex-end;
    border-radius:6px;
    color:white;
    margin-right:20px;
    padding-left:10px; padding-right:10px;
    padding-top:7px; padding-bottom:7px;
    margin-top:8px;
    margin-bottom:8px;
`
export const Rbt = styled(Text)`
    padding-left:13px;
    padding-right:13px;
    padding-top:7px;
    padding-bottom:7px;
    border-radius: 4px;
    margin-right:10px;
`
export const InputLanguage = styled(TextInput)` 
border-width: 1px;
border-radius: 6px;
border-color: ${props=>props.fg};
padding-bottom:3px;
padding-top:3px;
width:75%;
text-align:center;
`
export const AddLanguageButton = styled(Text)`
    align-self: center;
    margin-left:14px;
    background:#212121;
    color:white;
    border-radius:5px;
    padding-top:7px;
    padding-bottom:7px;
    padding-left:14px;
    padding-right:14px;
`

