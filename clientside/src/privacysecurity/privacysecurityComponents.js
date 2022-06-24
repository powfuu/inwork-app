import styled from 'styled-components'
import { View,Text, ScrollView,  TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 

export const PrivacySecurity = styled(View)`
flex-direction: row;
padding-left:15.25px;
padding-top:28px;
`
export const PrivacySecurityIc = styled(FontAwesome)`

`
export const PrivacySecurityTitle = styled(Text)`
font-size:18px;
margin-left:12px;
`
export const DevicesView = styled(View)`

`
export const DevicesTitleView = styled(View)`
flex-direction: row;
padding-top:30px;
padding-left:18.25px;
`
export const DevicesIc = styled(MaterialCommunityIcons)`
`
export const DevicesIc2 = styled(MaterialCommunityIcons)`
margin-left:14px;
margin-right: 8px;
margin-top:4.35px;
`
export const DevicesTitle = styled(Text)`
font-size:15px;
color:#000;
margin-left:10px;
margin-top:1px;
`
export const DevicesDesc = styled(Text)`
color:#999;
font-size:12px;
`
export const DevicesTitleLine = styled(Text)`
border-top-width: 1px;
border-top-color: rgb(235,235,235);
width:50%;
margin-top:13px;
margin-left:13px;
`
export const DeviceKeyView = styled(View)`
border-bottom-width: 1px;
border-bottom-color: rgb(235,235,235);
padding-bottom:13px;
margin-top:16px;
flex-direction: row;
`
export const DevicesRV = styled(View)`
flex-direction: column;
`
export const ClearDevices = styled(TouchableHighlight)`
background-color:#000;
width: 80%;;
border-radius: 6px;
align-self: center;
margin-top:32px;
padding-top:9px;
padding-bottom:9px;
`
export const ClearDevicesText = styled(Text)`
color:white;
text-align: center;
`
export const ChangePasswordView = styled(View)`
flex-direction: row;
padding-top:15px;
padding-bottom:12px;
border-top-color: rgb(235,235,235);
border-bottom-color: rgb(235,235,235);
border-bottom-width: 1px;
border-top-width: 1px;
padding-left:16px;
margin-top:30px;
`
export const ChangePasswordViewIc = styled(MaterialCommunityIcons)`
`
export const ChangePasswordViewTitle = styled(Text)`
margin-left:10px;
margin-top: 2px;
`
export const EmptydevicesText = styled(Text)`
align-self:center;
    margin-top:17px;
    margin-bottom:-4px;
    color:#777;
`
