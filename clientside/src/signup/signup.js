import { React } from 'react';
import { Alert } from 'react-native'
import * as e from './signupComponents'
import { MainView,Inwork } from '../../defaultStyles';
import businessObject from '../../resources/business-object.png'
import personalObject from '../../resources/personal-object.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Signup({navigation}){
    const goPersonal = () =>{ navigation.navigate('SignupPersonal') }
    const goBusiness = () =>{ navigation.navigate('SignupBusiness') }
return(
    <MainView>
        <e.ChoiceType>
        <e.TitleSignup>Join to <Inwork>inWork</Inwork> and start improving your opportunities</e.TitleSignup>
        <e.SelectBox>
            <e.Box onStartShouldSetResponder={goBusiness}>
                <e.BoxTitle>Business</e.BoxTitle>
                <e.BoxDescription>Select Business if you are searching for someone to work for you.</e.BoxDescription>
                <e.BoxObject source={businessObject}/>
            </e.Box>
            <e.Box onStartShouldSetResponder={goPersonal}>
                <e.BoxTitle>Personal</e.BoxTitle>
                <e.BoxDescription>Select Personal if you are interested on working for someone.</e.BoxDescription>
                <e.BoxObject source={personalObject}/>
            </e.Box>
        </e.SelectBox>
        </e.ChoiceType>
            <e.Footer>
                <e.FooterItem onPress={()=>{
                Linking.openURL('http://www.google.com/');
                }}>Terms & Conditions</e.FooterItem>
                <e.FooterItem onPress={()=>{
                Linking.openURL('http://www.google.com/');
                }}>Official Website</e.FooterItem>
            </e.Footer>
    </MainView>
);
}
